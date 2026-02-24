/**
 * Command that finds all CSS variables
 * When only assigned once, replaces all use occurances with the value
 * Then simplified calc where possible.
 *
 *
 *
 */

import { readFileSync, writeFileSync } from "node:fs";
import { basename, extname, join as pathJoin } from "node:path";
import { createUnit, evaluate, format } from "mathjs";
import { getModuleDir, saveFileSync, walkDirSync } from "../lib/fs.js";

let assignments = {};
let singleUseVars = {};

const parse = (content, { prefix = "" } = {}) => {
	const varAssignementRegExp =
		new RegExp([\t ]*(--${options.prefix}[a-zA-Z0-9-]+)[\;
	s;
	]*:[\s]*([^
};
]+)[
]?,'g')
// Find all variables
let match;
while ((match = varAssignementRegExp.exec(content))) {
	const [rawMatch, variable, value, terminator] = match;
	assignments[variable] ??= {
		rawMatch,
		value: value.trim(),
		//valueType:  // TODO only replace certain types
		assignmentCount: 0,
		foundCount: 0,
	};
	assignments[variable].assignmentCount += 1;
}
// console.log(assignments);
}

const fctUsageRegExp = /(calc)\(([a-zA-Z0-9. /*+-]+)\)/g; // TODO min, max, okhcl, rgb, ...
// const calcUnitEncodeRegExp = /([0-9\.]+)([a-z]+)/g;
const calcUnitDecodeRegExp = /([0-9.]+) ([a-z]+)/g;
const optimize = (content) => {
	singleUseVars = Object.keys(assignments).filter(
		(variable) => assignments[variable].assignmentCount === 1,
	);

	let optimizedContent = content;

	// Find all uses and replace with static value (iff assigned once)
	for (let i = 0, l = singleUseVars.length; i < l; i++) {
		const variable = singleUseVars[i];
		const value = assignments[variable].value;
		console.log(`replace \`var(${variable})\` with \`${value}\``);
		const usageRegex = new RegExp(
			`var\\([\\s]*${variable}[\\s]*\\)`, // TODO add in support for
			"g",
		);
		const startContent = optimizedContent;
		let endContent = startContent.replace(usageRegex, value);

		console.log(`replace \`var(${variable}, ...)\` with \`${value}\``);
		const usageFallbackRegex = new RegExp(
			`var\\([\\s]*${variable}[\\s]*,[^)]*\\)`,
			"g",
		);
		endContent = endContent.replace(usageFallbackRegex, value);

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
			if (fct === "calc") {
				try {
					const rawValue = evaluate(equation);
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
					console.log(`replace \`${rawMatch}\` with \`${value}\``);
					return value;
				} catch (e) {
					console.log(e.message, { cause: { equation } });
					return rawMatch;
				}
			}
			return rawMatch;
		},
	);

	optimizedContent = optimizedContent.replace(/[\t\s]*[\n]+/g, "\n");
	optimizedContent = optimizedContent.replace(/[\n]+/g, "\n");

	return optimizedContent;
};

const clean = (content) => {
	let optimizedContent = content;

	for (let i = 0, l = singleUseVars.length; i < l; i++) {
		const variable = singleUseVars[i];
		if (assignments[variable].foundCount !== 0) {
			console.log(
				`skip \`${assignments[variable].rawMatch}\` found recently, increase iterations`,
			);
			continue;
		}
		console.log(`replace \`${assignments[variable].rawMatch}\` with \`\``);
		optimizedContent = optimizedContent.replace(
			assignments[variable].rawMatch,
			"",
		);
	}
	// Remove comments
	// optimizedContent = optimizedContent.replace(
	//   /[\s]\/\*[ a-zA-Z0-9\.]+\*\//g,
	//   "",
	// );
	// Remove multiple new lines
	// optimizedContent = optimizedContent.replace(/[\n]+/g, "\n");
	return optimizedContent;
};

const optimizeStyles = (input, options = {}) => {
	const sourceDir = pathJoin(process.cwd(), input);
	//console.log(sourceDir, options)

	let changes = 0;
	// max 10 iterations
	for (let i = options.iterations; i--; ) {
		assignments = {};

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
			console.log("Saved", filePath);
		}
		if (!changes) {
			break;
		}
	}

	for (const filePath of walkDirSync(sourceDir, ".css")) {
		if (options.debug) {
			console.log("Clean variables", filePath);
		}
		const content = readFileSync(filePath).toString();
		const optimizedContent = clean(content, options);
		saveFileSync(filePath, optimizedContent);
		console.log("Saved", filePath);
	}

	console.log("Done!");
};

export default optimizeStyles;

// Setup css units
createUnit("px");
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

// let content = `
//   :root{color-scheme:light dark;--border-radius: 0;--grid-gap: 1.5rem;--font-size: 100%}
//   :root {
//     --extras-spaces  :  #000  ;
//     --dual-assign: 1;
//     --color-hex: #000000;
//     --int: 2;
//     --em: 3;
//     --percent: 50%;

//     --var-color-hex: var(--color-hex);
//     --var-int: var(--int);

//     --calc-int-add-var-int: calc(1 + var(--int)); /* 2 */

//     --calc-int-add-int: calc(1 + 1); /* 2 */
//     --calc-em-add-em: calc(0.1em + 0.2em); /* 0.3em */
//     --calc-int-add-px: calc(1 + 1px); /* no change */
//     --calc-int-mult-int: calc(2 * 3); /* 6 */
//     --calc-em-mult-em: calc(2em * 3em); /* no change */
//     --calc-int-mult-em: calc(2 * 3em); /* 6em */
//     --tag-bg: oklch( from var(--theme-color, --hex-none) var(--lightness-main-pseudo) c h );
//   }

//   div {
//     color: var(--var-color-hex, #FFF);
//     height: var(--var-int);

//     width: var(--percent, --int);

//     width: var(--calc-int-add-var-int);

//     width: var(--calc-int-add-int);
//     width: var(--calc-em-add-em);
//     width: var(--calc-int-add-px);
//     width: var(--calc-int-mult-int);
//     width: var(--calc-em-mult-em);
//     width: var(--calc-int-mult-em);

//     padding: calc(var(--calc-int-mult-int) * 0.25) calc(var(--calc-em-add-em) * 0.5);
//   }

//   a {
//     --dual-assign: 2;
//   }

//   `;

// let optimizedContent = content;

// assignments = {};
// parse(optimizedContent);
// optimizedContent = optimize(content);
// console.log(assignments, optimizedContent);

// assignments = {};
// parse(optimizedContent);
// optimizedContent = optimize(optimizedContent);
// console.log(optimizedContent);

// assignments = {};
// parse(optimizedContent);
// optimizedContent = optimize(optimizedContent);
// console.log(optimizedContent);

// optimizedContent = clean(optimizedContent);
// console.log("Done");
// console.log(optimizedContent);
