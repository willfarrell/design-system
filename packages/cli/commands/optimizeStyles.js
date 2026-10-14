/**
 * Command that finds all CSS variables
 * When only assigned once, replaces all use occurances with the value
 * Then simplified calc where possible.
 */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import convert from "color-convert";
import {
	createUnit,
	evaluate,
	format,
	max as mathjsMax,
	min as mathjsMin,
} from "mathjs";
import { saveFileSync, walkDirSync } from "../lib/fs.js";
import { escapeRegExp } from "../lib/regexp.js";

const rgbToHex = (r, g, b, a) => {
	const hex = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
	if (a !== undefined) {
		const ai = Math.round(a * 255);
		if (ai === 255) {
			return hex;
		}
		return `${hex}${ai.toString(16).padStart(2, "0")}`;
	}
	return hex;
};

const clampRgb = (v) => Math.max(0, Math.min(255, Math.round(v)));

const inGamut = (rgb) => rgb.every((v) => v >= -0.5 && v < 255.5);

const colorReplace = (content, regex, convertFn) => {
	return content.replace(regex, (rawMatch, c1, c2, c3, a) => {
		const af = a !== undefined ? Number.parseFloat(a) : undefined;
		if (af !== undefined && (af < 0 || af > 1)) return rawMatch;
		const rgb = convertFn(
			Number.parseFloat(c1),
			Number.parseFloat(c2),
			Number.parseFloat(c3),
		);
		if (!inGamut(rgb)) return rawMatch;
		const [r, g, b] = rgb.map(clampRgb);
		return rgbToHex(r, g, b, af);
	});
};

// OKLab/OKLCh to sRGB (manual implementation — not in color-convert)
const oklabToLinearRgb = (L, a, b) => {
	const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
	const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
	const s_ = L - 0.0894841775 * a - 1.291485548 * b;
	const l = l_ * l_ * l_;
	const m = m_ * m_ * m_;
	const s = s_ * s_ * s_;
	return [
		+4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
		-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
		-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
	];
};

const srgbGamma = (c) =>
	c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
const srgbLinear = (c) =>
	c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;

const oklabToRgb = (L, a, b) => {
	const linear = oklabToLinearRgb(L, a, b);
	return linear.map((c) => srgbGamma(c) * 255);
};

const oklchToRgb = (L, C, h) => {
	const hRad = (h * Math.PI) / 180;
	const a = C * Math.cos(hRad);
	const b = C * Math.sin(hRad);
	return oklabToRgb(L, a, b);
};

const inheritedProperties = [
	"color",
	"cursor",
	"direction",
	"font",
	"font-family",
	"font-feature-settings",
	"font-kerning",
	"font-size",
	"font-style",
	"font-variant",
	"font-weight",
	"letter-spacing",
	"line-height",
	"list-style",
	"list-style-type",
	"list-style-position",
	"list-style-image",
	"overflow-wrap",
	"text-align",
	"text-indent",
	"text-transform",
	"visibility",
	"white-space",
	"word-spacing",
	"orphans",
	"widows",
];

const nonInheritingElements = new Set([
	"input",
	"select",
	"textarea",
	"button",
	"optgroup",
]);

const simpleElementSelectorRegExp = /^[a-z][a-z0-6]*$/;

const globalSelectorRegExp = /^(:root|body|html)(\s*,\s*(:root|body|html))*$/;

const findEnclosingSelector = (content, matchIndex) => {
	let depth = 0;
	let i = matchIndex;
	while (i >= 0) {
		if (content[i] === "}") depth++;
		else if (content[i] === "{") {
			if (depth === 0) {
				let j = i - 1;
				while (j >= 0 && content[j] !== "}" && content[j] !== "{") j--;
				return content.slice(j + 1, i).trim();
			}
			depth--;
		}
		i--;
	}
	return null;
};

let assignments;
let singleUseVars;
let bodyInheritedDeclarations;

const init = () => {
	assignments = {};
	singleUseVars = {};
	bodyInheritedDeclarations = {};
};

const parse = (content, { prefix = "" } = {}) => {
	const varAssignementRegExp = new RegExp(
		`[\\t ]*(--${prefix}[a-zA-Z0-9-]+)[\\s]*:[\\s]*([^};]+)[;]?`,
		"g",
	);
	// Find all variables
	let match = varAssignementRegExp.exec(content);
	while (match !== null) {
		const [rawMatch, variable, value, _terminator] = match;
		const trimmedValue = value.trim();
		assignments[variable] ??= {
			rawMatch,
			value: trimmedValue,
			//valueType:  // TODO only replace certain types
			assignmentCount: 0,
			foundCount: 0,
			scoped: false,
		};

		const selector = findEnclosingSelector(content, match.index);
		if (selector !== null && !globalSelectorRegExp.test(selector)) {
			assignments[variable].scoped = true;
		}

		// Only count as a new assignment if the value differs (same value in multiple chunks is logically one assignment)
		if (
			assignments[variable].assignmentCount === 0 ||
			assignments[variable].value !== trimmedValue
		) {
			assignments[variable].assignmentCount += 1;
		}
		match = varAssignementRegExp.exec(content);
	}
};

const fctUsageRegExp = /(calc|min|max|clamp)\(([a-zA-Z0-9. /*+,%-]+)\)/g;
const calcUnitDecodeRegExp = /([0-9.]+) ([a-z]+)/g;
const percentEncodeRegExp = /(\d)%/g;
const percentDecodeRegExp = /pct/g;
const rgbRegExp =
	/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*([0-9.]+)\s*)?\)/g;
// hsl: legacy comma syntax  hsl(120, 100%, 50%)  hsla(120, 100%, 50%, 0.5)
const hslLegacyRegExp =
	/hsla?\(\s*(-?[\d.]+)\s*,\s*([\d.]+)%\s*,\s*([\d.]+)%\s*(?:,\s*([\d.]+)\s*)?\)/g;
// hsl: modern space syntax  hsl(120 100% 50%)  hsl(120 100% 50% / 0.5)
const hslModernRegExp =
	/hsl\(\s*(-?[\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*(?:\/\s*([\d.]+)\s*)?\)/g;
// hwb(120 0% 0%)  hwb(120 0% 0% / 0.5)
const hwbRegExp =
	/hwb\(\s*(-?[\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*(?:\/\s*([\d.]+)\s*)?\)/g;
// lab(50% 20 -30)  lab(50% 20 -30 / 0.5)
const labRegExp =
	/lab\(\s*([\d.]+)%\s+(-?[\d.]+)\s+(-?[\d.]+)\s*(?:\/\s*([\d.]+)\s*)?\)/g;
// lch(50% 30 120)  lch(50% 30 120 / 0.5)
const lchRegExp =
	/lch\(\s*([\d.]+)%\s+([\d.]+)\s+(-?[\d.]+)\s*(?:\/\s*([\d.]+)\s*)?\)/g;
// oklab(0.5 0.1 -0.1)  oklab(0.5 0.1 -0.1 / 0.5)
const oklabRegExp =
	/oklab\(\s*([\d.]+)\s+(-?[\d.]+)\s+(-?[\d.]+)\s*(?:\/\s*([\d.]+)\s*)?\)/g;
// oklch(0.5 0.2 120)  oklch(0.5 0.2 120 / 0.5)
const oklchRegExp =
	/oklch\(\s*([\d.]+)\s+([\d.]+)\s+(-?[\d.]+)\s*(?:\/\s*([\d.]+)\s*)?\)/g;
// color(srgb 1 0.5 0)  color(srgb 1 0.5 0 / 0.8)
const colorFnRegExp =
	/color\(\s*(srgb|srgb-linear)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+)\s*)?\)/g;

const hslToRgb = (h, s, l) => convert.hsl.rgb(h, s, l);
const hwbToRgb = (h, w, b) => convert.hwb.rgb(h, w, b);
const multiply = (matrix, vector) =>
	matrix.map((row) => row.reduce((sum, m, i) => sum + m * vector[i], 0));
const labD50White = [0.3457 / 0.3585, 1, (1 - 0.3457 - 0.3585) / 0.3585];
const labKappa = 24389 / 27;
const labEpsilon = 216 / 24389;
const labToXyzD50 = (l, a, b) => {
	const f1 = (l + 16) / 116;
	const f0 = a / 500 + f1;
	const f2 = f1 - b / 200;
	return [
		f0 ** 3 > labEpsilon ? f0 ** 3 : (116 * f0 - 16) / labKappa,
		l > labKappa * labEpsilon ? f1 ** 3 : l / labKappa,
		f2 ** 3 > labEpsilon ? f2 ** 3 : (116 * f2 - 16) / labKappa,
	].map((v, i) => v * labD50White[i]);
};
const d50ToD65 = [
	[0.955473421488075, -0.02309845494876471, 0.06325924320057072],
	[-0.0283697093338637, 1.0099953980813041, 0.021041441191917323],
	[0.012314014864481998, -0.020507649298898964, 1.330365926242124],
];
const xyzD65ToLinearRgb = [
	[3.2409699419045226, -1.537383177570094, -0.4986107602930034],
	[-0.9692436362808796, 1.8759675015077202, 0.04155505740717559],
	[0.05563007969699366, -0.20397695888897652, 1.0569715142428786],
];
const labToRgb = (l, a, b) =>
	multiply(xyzD65ToLinearRgb, multiply(d50ToD65, labToXyzD50(l, a, b))).map(
		(c) => srgbGamma(c) * 255,
	);
const lchToRgb = (l, c, h) => {
	const hRad = (h * Math.PI) / 180;
	return labToRgb(l, c * Math.cos(hRad), c * Math.sin(hRad));
};

const colorFnReplace = (content) => {
	return content.replace(colorFnRegExp, (rawMatch, space, c1, c2, c3, a) => {
		const af = a !== undefined ? Number.parseFloat(a) : undefined;
		if (af !== undefined && (af < 0 || af > 1)) return rawMatch;
		const rgb = [c1, c2, c3].map((c) => {
			const v = Number.parseFloat(c);
			return (space === "srgb" ? v : srgbGamma(v)) * 255;
		});
		if (!inGamut(rgb)) return rawMatch;
		const [r, g, b] = rgb.map(clampRgb);
		return rgbToHex(r, g, b, af);
	});
};

const colorMixReplace = (content) => {
	const marker = "color-mix(";
	let result = "";
	let idx = 0;
	while (idx < content.length) {
		const pos = content.indexOf(marker, idx);
		if (pos === -1) {
			result += content.slice(idx);
			break;
		}
		result += content.slice(idx, pos);
		// Find matching closing paren
		let depth = 1;
		let i = pos + marker.length;
		while (i < content.length && depth > 0) {
			if (content[i] === "(") depth++;
			else if (content[i] === ")") depth--;
			i++;
		}
		if (depth !== 0) {
			result += content.slice(pos, i);
			idx = i;
			continue;
		}
		const fullMatch = content.slice(pos, i);
		const inner = content.slice(pos + marker.length, i - 1).trim();
		// Skip if contains var( or from
		if (inner.includes("var(") || inner.includes("from")) {
			result += fullMatch;
			idx = i;
			continue;
		}
		// Parse: in <colorspace>, <color1> [<pct>%], <color2> [<pct>%]
		const commaIdx1 = inner.indexOf(",");
		if (commaIdx1 === -1) {
			result += fullMatch;
			idx = i;
			continue;
		}
		const spacePart = inner.slice(0, commaIdx1).trim();
		const linear = spacePart === "in srgb-linear";
		if (!linear && spacePart !== "in srgb") {
			result += fullMatch;
			idx = i;
			continue;
		}
		const rest = inner.slice(commaIdx1 + 1);
		const commaIdx2 = rest.indexOf(",");
		if (commaIdx2 === -1) {
			result += fullMatch;
			idx = i;
			continue;
		}
		const arg1 = rest.slice(0, commaIdx2).trim();
		const arg2 = rest.slice(commaIdx2 + 1).trim();
		const parseColorArg = (arg) => {
			const pctMatch = arg.match(/^(.+?)\s+([\d.]+)%\s*$/);
			let colorStr, pct;
			if (pctMatch) {
				colorStr = pctMatch[1].trim();
				pct = Number.parseFloat(pctMatch[2]) / 100;
			} else {
				colorStr = arg.trim();
				pct = undefined;
			}
			let rgb;
			let alpha = 1;
			if (colorStr.startsWith("#")) {
				const hex = colorStr.slice(1);
				if (/^(?:[0-9a-f]{3,4}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hex)) {
					const channels = (
						hex.length <= 4 ? hex.replace(/./g, "$&$&") : hex
					).match(/../g);
					rgb = channels.slice(0, 3).map((c) => Number.parseInt(c, 16));
					alpha = channels[3] ? Number.parseInt(channels[3], 16) / 255 : 1;
				} else {
					rgb = null;
				}
			} else {
				try {
					rgb = convert.keyword.rgb(colorStr);
				} catch {
					rgb = null;
				}
			}
			return { rgb, alpha, pct };
		};
		const c1 = parseColorArg(arg1);
		const c2 = parseColorArg(arg2);
		if (!c1.rgb || !c2.rgb) {
			result += fullMatch;
			idx = i;
			continue;
		}
		// Resolve percentages per CSS spec
		let p1 = c1.pct;
		let p2 = c2.pct;
		if (p1 === undefined && p2 === undefined) {
			p1 = 0.5;
			p2 = 0.5;
		} else if (p1 !== undefined && p2 === undefined) {
			p2 = 1 - p1;
		} else if (p1 === undefined && p2 !== undefined) {
			p1 = 1 - p2;
		}
		const sum = p1 + p2;
		if (!(sum > 0) || [p1, p2].some((p) => p < 0 || p > 1)) {
			result += fullMatch;
			idx = i;
			continue;
		}
		if (sum > 1) {
			p1 /= sum;
			p2 /= sum;
		}
		const toSpace = (c) => (linear ? srgbLinear(c / 255) : c);
		const fromSpace = (c) => (linear ? srgbGamma(c) * 255 : c);
		const w1 = c1.alpha * p1;
		const w2 = c2.alpha * p2;
		const alpha = w1 + w2;
		const [r, g, b] = [0, 1, 2].map((k) =>
			alpha
				? clampRgb(
						fromSpace(
							(toSpace(c1.rgb[k]) * w1 + toSpace(c2.rgb[k]) * w2) / alpha,
						),
					)
				: 0,
		);
		const hex = rgbToHex(r, g, b, alpha);
		result += hex;
		idx = i;
	}
	return result;
};

const splitCalcTerms = (equation) => {
	const terms = [];
	let depth = 0;
	let current = "";
	let sign = "+";

	for (let i = 0; i < equation.length; i++) {
		const ch = equation[i];
		if (ch === "(") {
			depth++;
			current += ch;
		} else if (ch === ")") {
			depth--;
			current += ch;
		} else if (
			depth === 0 &&
			ch === " " &&
			i + 2 < equation.length &&
			(equation[i + 1] === "+" || equation[i + 1] === "-") &&
			equation[i + 2] === " "
		) {
			if (current.trim()) {
				terms.push({ sign, text: current.trim() });
			}
			sign = equation[i + 1];
			i += 2;
			current = "";
		} else {
			current += ch;
		}
	}
	if (current.trim()) {
		terms.push({ sign, text: current.trim() });
	}
	return terms;
};

const simplifyCalcExpression = (equation) => {
	const terms = splitCalcTerms(equation);

	if (terms.length <= 1) return null;

	// Evaluate each term
	const evaluated = terms.map((term) => {
		if (term.text.includes("var(") || term.text.includes("calc(")) {
			return { ...term, evaluable: false };
		}
		try {
			const safeText = term.text.replace(percentEncodeRegExp, "$1 pct");
			const rawValue = evaluate(safeText);
			let formatted = format(rawValue, { precision: 14 }).toString();
			// Remove space between number and unit (e.g. "2 rem" → "2rem")
			formatted = formatted.replace(/(\d)\s+([a-z%]+)/g, "$1$2");
			formatted = formatted.replace(percentDecodeRegExp, "%");
			const m = formatted.match(/^(-?[\d.]+)([a-z%]*)$/);
			if (m) {
				return {
					...term,
					evaluable: true,
					value: Number.parseFloat(m[1]),
					unit: m[2] || "",
				};
			}
			return { ...term, evaluable: false };
		} catch {
			return { ...term, evaluable: false };
		}
	});

	// Check if any terms are evaluable
	const hasEvaluable = evaluated.some((t) => t.evaluable);
	if (!hasEvaluable) return null;

	// Combine like-unit evaluable terms
	const unitSums = new Map();
	for (const term of evaluated) {
		if (!term.evaluable) continue;
		const effectiveValue = term.sign === "-" ? -term.value : term.value;
		const current = unitSums.get(term.unit) || 0;
		unitSums.set(term.unit, current + effectiveValue);
	}

	// Build result maintaining original order
	const resultParts = [];
	const emittedUnits = new Set();

	for (const term of evaluated) {
		if (!term.evaluable) {
			resultParts.push({ sign: term.sign, text: term.text });
		} else if (!emittedUnits.has(term.unit)) {
			emittedUnits.add(term.unit);
			const sum = unitSums.get(term.unit);
			if (sum === 0) continue;
			const sign = sum >= 0 ? "+" : "-";
			const absStr = `${Number.parseFloat(Math.abs(sum).toPrecision(14))}${term.unit}`;
			resultParts.push({ sign, text: absStr });
		}
	}

	if (resultParts.length === 0) return "0";

	// Check if anything actually changed
	if (resultParts.length === terms.length) {
		let changed = false;
		for (let i = 0; i < resultParts.length; i++) {
			if (
				resultParts[i].sign !== evaluated[i].sign ||
				resultParts[i].text !== evaluated[i].text
			) {
				changed = true;
				break;
			}
		}
		if (!changed) return null;
	}

	// Reconstruct expression
	let expr = "";
	for (let i = 0; i < resultParts.length; i++) {
		if (i === 0) {
			expr =
				resultParts[i].sign === "-"
					? `-${resultParts[i].text}`
					: resultParts[i].text;
		} else {
			expr += ` ${resultParts[i].sign} ${resultParts[i].text}`;
		}
	}

	// Single term without var → drop calc wrapper
	if (resultParts.length === 1 && !expr.includes("var(")) {
		return expr;
	}

	return `calc(${expr})`;
};

const simplifyCalcWithVar = (content) => {
	const marker = "calc(";
	let result = "";
	let idx = 0;
	while (idx < content.length) {
		const pos = content.indexOf(marker, idx);
		if (pos === -1) {
			result += content.slice(idx);
			break;
		}
		result += content.slice(idx, pos);
		// Find matching closing paren
		let depth = 1;
		let i = pos + marker.length;
		while (i < content.length && depth > 0) {
			if (content[i] === "(") depth++;
			else if (content[i] === ")") depth--;
			i++;
		}
		if (depth !== 0) {
			result += content.slice(pos, i);
			idx = i;
			continue;
		}
		const fullMatch = content.slice(pos, i);
		const inner = content.slice(pos + marker.length, i - 1).trim();

		// Only process if it contains var(
		if (!inner.includes("var(")) {
			result += fullMatch;
			idx = i;
			continue;
		}

		// Skip nested calc
		if (inner.includes("calc(")) {
			result += fullMatch;
			idx = i;
			continue;
		}

		const simplified = simplifyCalcExpression(inner);
		if (simplified !== null) {
			result += simplified;
		} else {
			result += fullMatch;
		}
		idx = i;
	}
	return result;
};

const optimize = (content) => {
	singleUseVars = Object.keys(assignments).filter(
		(variable) =>
			assignments[variable].assignmentCount === 1 &&
			!assignments[variable].scoped,
	);

	let optimizedContent = content;

	// Find all uses and replace with static value (iff assigned once)
	for (let i = 0, l = singleUseVars.length; i < l; i++) {
		const variable = singleUseVars[i];
		const value = assignments[variable].value;
		const usageRegex = new RegExp(
			`var\\([\\s]*${variable}[\\s]*\\)`, // TODO add in support for
			"g",
		);
		const startContent = optimizedContent;
		let endContent = startContent.replace(usageRegex, value);

		// Use paren-aware replacement to handle nested var() fallbacks
		const marker = `var(`;
		let rebuilt = "";
		let idx = 0;
		while (idx < endContent.length) {
			const pos = endContent.indexOf(marker, idx);
			if (pos === -1) {
				rebuilt += endContent.slice(idx);
				break;
			}
			// Find matching closing paren
			let depth = 1;
			let i = pos + marker.length;
			while (i < endContent.length && depth > 0) {
				if (endContent[i] === "(") depth++;
				else if (endContent[i] === ")") depth--;
				i++;
			}
			if (depth !== 0) {
				rebuilt += endContent.slice(idx, i);
				idx = i;
				continue;
			}
			const inner = endContent.slice(pos + marker.length, i - 1);
			const varNameMatch = inner.match(new RegExp(`^\\s*${variable}\\s*,`));
			if (varNameMatch) {
				rebuilt += endContent.slice(idx, pos);
				rebuilt += value;
				idx = i;
			} else {
				rebuilt += endContent.slice(idx, i);
				idx = i;
			}
		}
		endContent = rebuilt;

		if (startContent !== endContent) {
			assignments[variable].foundCount += 1;
		}

		optimizedContent = endContent;
	}

	// Find all calc() and simplify when using the same units
	optimizedContent = optimizedContent.replace(
		fctUsageRegExp,
		(rawMatch, ...expressions) => {
			const [fct, equation] = expressions;

			if (rawMatch.includes("var(")) {
				return rawMatch;
			}
			if (equation.includes(`${fct}(`)) {
				return rawMatch;
			}
			// Bare identifier (not a unit suffix like `1em`) = relative color
			// channel (`calc(l + 0.5)`) or CSS keyword — mathjs would misread
			// it as a unit (l = liter), so leave untouched
			if (/(?<![\d.a-zA-Z])[a-zA-Z]+/.test(equation)) {
				return rawMatch;
			}
			if (fct === "calc") {
				try {
					const safeEquation = equation.replace(percentEncodeRegExp, "$1 pct");
					const rawValue = evaluate(safeEquation);
					let value = rawValue.toString(); // TODO fix floating point error format() & remove space
					if (!value) {
						return rawMatch;
					}

					// Don't allow exponents
					if (value?.includes("^")) {
						return rawMatch;
					}

					value = format(rawValue, { precision: 14 }).toString();
					value = value.replace(calcUnitDecodeRegExp, "$1$2");
					value = value.replace(percentDecodeRegExp, "%");
					return value;
				} catch (e) {
					// Try partial simplification for mixed-unit expressions
					const simplified = simplifyCalcExpression(equation);
					if (simplified !== null) {
						return simplified;
					}
					if (!["Units do not match"].includes(e.message)) {
						console.error(e.message, { cause: { fct, equation } });
					}
					return rawMatch;
				}
			} else if (fct === "min" || fct === "max") {
				try {
					const args = equation.split(",").map((s) => s.trim());
					const evaluatedArgs = args.map((arg) =>
						evaluate(arg.replace(percentEncodeRegExp, "$1 pct")),
					);
					const pickFn = fct === "min" ? mathjsMin : mathjsMax;
					const rawValue = pickFn(...evaluatedArgs);
					let value = format(rawValue, { precision: 14 }).toString();
					value = value.replace(calcUnitDecodeRegExp, "$1$2");
					value = value.replace(percentDecodeRegExp, "%");
					return value;
				} catch (e) {
					if (
						![
							"Cannot compare units with different base",
							'Cannot calculate max, unexpected type of argument (type: Unit, value: {"mathjs":"Unit","value":1,"unit":"fr","fixPrefix":false,"skipSimp":true})',
						].includes(e.message)
					) {
						console.error(e.message, { cause: { fct, equation } });
					}
					return rawMatch;
				}
			} else if (fct === "clamp") {
				try {
					const args = equation.split(",").map((s) => s.trim());
					if (args.length !== 3) return rawMatch;
					const evaluatedArgs = args.map((arg) =>
						evaluate(arg.replace(percentEncodeRegExp, "$1 pct")),
					);
					// clamp(min, val, max) = max(min, min(val, max))
					const rawValue = mathjsMax(
						evaluatedArgs[0],
						mathjsMin(evaluatedArgs[1], evaluatedArgs[2]),
					);
					let value = format(rawValue, { precision: 14 }).toString();
					value = value.replace(calcUnitDecodeRegExp, "$1$2");
					value = value.replace(percentDecodeRegExp, "%");
					return value;
				} catch (e) {
					if (
						!["Cannot compare units with different base"].includes(e.message)
					) {
						console.error(e.message, { cause: { fct, equation } });
					}
					return rawMatch;
				}
			}
			return rawMatch;
		},
	);

	// Simplify calc() expressions containing var()
	optimizedContent = simplifyCalcWithVar(optimizedContent);

	// Convert rgb()/rgba() with static values to hex
	optimizedContent = optimizedContent.replace(
		rgbRegExp,
		(rawMatch, r, g, b, a) => {
			const ri = Number.parseInt(r, 10);
			const gi = Number.parseInt(g, 10);
			const bi = Number.parseInt(b, 10);
			if (ri > 255 || gi > 255 || bi > 255) return rawMatch;
			const af = a !== undefined ? Number.parseFloat(a) : undefined;
			if (af !== undefined && (af < 0 || af > 1)) return rawMatch;
			const hex = rgbToHex(ri, gi, bi, af);
			return hex;
		},
	);

	// Convert hsl/hsla to hex
	optimizedContent = colorReplace(optimizedContent, hslLegacyRegExp, hslToRgb);
	optimizedContent = colorReplace(optimizedContent, hslModernRegExp, hslToRgb);
	// Convert hwb to hex
	optimizedContent = colorReplace(optimizedContent, hwbRegExp, hwbToRgb);
	// Convert lab to hex
	optimizedContent = colorReplace(optimizedContent, labRegExp, labToRgb);
	// Convert lch to hex
	optimizedContent = colorReplace(optimizedContent, lchRegExp, lchToRgb);
	// Convert oklab to hex
	optimizedContent = colorReplace(optimizedContent, oklabRegExp, oklabToRgb);
	// Convert oklch to hex
	optimizedContent = colorReplace(optimizedContent, oklchRegExp, oklchToRgb);
	// Convert color() to hex
	optimizedContent = colorFnReplace(optimizedContent);
	// Convert color-mix() to hex
	optimizedContent = colorMixReplace(optimizedContent);

	// Shorten hex colors: #aabbcc → #abc, #aabbccdd → #abcd
	// Skip hex values inside url(...) to avoid breaking SVG data URIs
	optimizedContent = optimizedContent.replace(
		/url\([^)]*\)|#([0-9a-fA-F]{8})\b|#([0-9a-fA-F]{6})\b/g,
		(rawMatch, hex8, hex6) => {
			if (rawMatch.startsWith("url(")) return rawMatch;
			if (hex8) {
				const h = hex8.toLowerCase();
				if (h[0] === h[1] && h[2] === h[3] && h[4] === h[5] && h[6] === h[7]) {
					const short = `#${h[0]}${h[2]}${h[4]}${h[6]}`;
					return short;
				}
				return rawMatch;
			}
			if (hex6) {
				const h = hex6.toLowerCase();
				if (h[0] === h[1] && h[2] === h[3] && h[4] === h[5]) {
					const short = `#${h[0]}${h[2]}${h[4]}`;
					return short;
				}
				return rawMatch;
			}
			return rawMatch;
		},
	);

	// Strip units from zero values (length units only)
	optimizedContent = optimizedContent.replace(
		/\b0(px|em|rem|ch|ex|vw|vh|svh|lvh|dvh|vmin|vmax|cqw|cqh|cqi|cqb|cm|mm|in|pc|pt|Q|cap|ic|lh|rlh)\b/g,
		(rawMatch) => {
			return "0";
		},
	);

	optimizedContent = optimizedContent.replace(/[\t\s]*[\n]+/g, "\n");
	optimizedContent = optimizedContent.replace(/[\n]+/g, "\n");

	return optimizedContent;
};

const clean = (content, options = {}) => {
	let optimizedContent = content;

	for (let i = 0, l = singleUseVars.length; i < l; i++) {
		const variable = singleUseVars[i];
		if (assignments[variable].foundCount !== 0) {
			console.log(
				`skip \`${assignments[variable].rawMatch}\` found recently, increase iterations`,
			);
			continue;
		}
		optimizedContent = optimizedContent.replace(
			assignments[variable].rawMatch,
			"",
		);
	}
	// Remove comments (skip inside url(...) data URIs)
	if (options.removeComments !== false) {
		optimizedContent = optimizedContent.replace(
			/url\([^)]*\)|\/\*[\s\S]*?\*\//g,
			(match) => {
				if (match.startsWith("url(")) return match;
				return "";
			},
		);
	}

	// Remove empty rules (top-level only)
	optimizedContent = optimizedContent.replace(/[^\n{}]*\{\s*\}/g, (match) => {
		return "";
	});

	// Remove multiple new lines
	optimizedContent = optimizedContent.replace(/[\n]+/g, "\n");
	return optimizedContent;
};

const parseBodyDeclarations = (content) => {
	const bodyBlockRegExp = /([^{}]*)\{([^{}]*)\}/g;
	let match = bodyBlockRegExp.exec(content);
	while (match !== null) {
		const [, selector, block] = match;
		const preceding = content.slice(0, match.index);
		const isNested =
			(preceding.match(/\{/g) || []).length >
			(preceding.match(/\}/g) || []).length;
		if (isNested || !selector.split(",").some((s) => s.trim() === "body")) {
			match = bodyBlockRegExp.exec(content);
			continue;
		}
		const declRegExp = /([a-z-]+)\s*:\s*([^;]+)(?:;|$)/g;
		let declMatch = declRegExp.exec(block);
		while (declMatch !== null) {
			const prop = declMatch[1].trim();
			const val = declMatch[2].trim();
			if (inheritedProperties.includes(prop)) {
				bodyInheritedDeclarations[prop] = val;
			}
			declMatch = declRegExp.exec(block);
		}
		match = bodyBlockRegExp.exec(content);
	}
};

const removeInherited = (content) => {
	let result = content;
	// Match top-level rules only (not inside @media etc.)
	// We process rule by rule, skipping @-rules
	const topLevelRuleRegExp = /([^@{}][^{]*?)\{([^}]*)\}/g;
	const replacements = [];
	let ruleMatch = topLevelRuleRegExp.exec(content);
	while (ruleMatch !== null) {
		const selector = ruleMatch[1].trim();
		const blockContent = ruleMatch[2];
		const fullMatch = ruleMatch[0];
		const matchStart = ruleMatch.index;

		// Check if we're inside an @-rule by looking for unmatched { before this position
		const preceding = content.slice(0, matchStart);
		const openBraces = (preceding.match(/\{/g) || []).length;
		const closeBraces = (preceding.match(/\}/g) || []).length;
		const isNested = openBraces > closeBraces;

		if (
			!isNested &&
			simpleElementSelectorRegExp.test(selector) &&
			selector !== "body" &&
			!nonInheritingElements.has(selector)
		) {
			let newBlock = blockContent;
			for (const [prop, val] of Object.entries(bodyInheritedDeclarations)) {
				const declPattern = new RegExp(
					`(?<=^|[;\\s])[\\t ]*${escapeRegExp(prop)}\\s*:\\s*${escapeRegExp(val)}\\s*(?:;|$)`,
					"g",
				);
				newBlock = newBlock.replace(declPattern, "");
			}
			if (newBlock !== blockContent) {
				replacements.push({
					original: fullMatch,
					replacement: `${ruleMatch[1]}{${newBlock}}`,
				});
			}
		}
		ruleMatch = topLevelRuleRegExp.exec(content);
	}

	for (const { original, replacement } of replacements) {
		result = result.replace(original, replacement);
	}
	return result;
};

const optimizeStyles = (input, options = {}) => {
	init();
	const sourceDir = resolve(input);

	for (let i = options.iterations; i--; ) {
		assignments = {};
		let changes = 0;

		for (const filePath of walkDirSync(sourceDir, ".css")) {
			if (options.debug) {
				console.log("Parse variables", filePath);
			}
			const content = readFileSync(filePath).toString();
			parse(content, options);
		}

		for (const filePath of walkDirSync(sourceDir, ".css")) {
			if (options.debug) {
				console.log("Optimize variables", filePath);
			}
			const content = readFileSync(filePath).toString();
			const optimizedContent = optimize(content, options);
			if (content !== optimizedContent) {
				changes += 1;
			}
			saveFileSync(filePath, optimizedContent);
			if (options.debug) {
				console.log("Saved", filePath);
			}
		}
		if (!changes) {
			break;
		}
	}

	// Collect body inherited declarations from all files
	for (const filePath of walkDirSync(sourceDir, ".css")) {
		if (options.debug) {
			console.log("Parse body declarations", filePath);
		}
		const content = readFileSync(filePath).toString();
		parseBodyDeclarations(content);
	}

	// Remove redundant inherited declarations from all files
	for (const filePath of walkDirSync(sourceDir, ".css")) {
		if (options.debug) {
			console.log("Remove inherited", filePath);
		}
		const content = readFileSync(filePath).toString();
		const optimizedContent = removeInherited(content);
		if (content !== optimizedContent) {
			saveFileSync(filePath, optimizedContent);
		}
	}

	for (const filePath of walkDirSync(sourceDir, ".css")) {
		if (options.debug) {
			console.log("Clean variables", filePath);
		}
		const content = readFileSync(filePath).toString();
		const optimizedContent = clean(content, options);

		const diff = optimizedContent.length - content.length;

		saveFileSync(filePath, optimizedContent);
		if (options.debug) {
			console.log(`Saved ${diff} bytes`, filePath);
		}
	}
	if (options.debug) {
		console.log("Done!");
	}
};

export default optimizeStyles;

// Setup css units
createUnit("px");
createUnit("fr");
createUnit("cm");
createUnit("mm");
createUnit("Q");
createUnit("pc", "16px");
try {
	createUnit("in", "96px");
} catch (_e) {}
try {
	createUnit("pt");
} catch (_e) {}
try {
	createUnit("%");
} catch (_e) {}
createUnit("pct");
["", "l", "s", "d"].forEach((prefix) => {
	createUnit(`${prefix}vh`);
	createUnit(`${prefix}vw`);
	createUnit(`${prefix}vmin`);
	createUnit(`${prefix}vmax`);
});

createUnit("cqw");
createUnit("cqh");
createUnit("cqi");
createUnit("cqb");
createUnit("cqmin");
createUnit("cqmax");

["", "r"].forEach((prefix) => {
	createUnit(`${prefix}em`);
	try {
		createUnit(`${prefix}ch`);
	} catch (_e) {}
	createUnit(`${prefix}ex`);
	createUnit(`${prefix}cap`);
	createUnit(`${prefix}ic`);
	createUnit(`${prefix}lh`);
});
