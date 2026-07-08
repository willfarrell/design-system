import AxeBuilder from "@axe-core/playwright";
import { expect } from "@playwright/test";

export const wcagTags = [
	"wcag2a",
	"wcag2aa",
	"wcag2aaa",
	"wcag22a",
	"wcag22aa",
	"wcag22aaa",
];

export async function expectNoAxeViolations(page, disabledRules = []) {
	let builder = new AxeBuilder({ page }).withTags(wcagTags);
	if (disabledRules.length > 0) {
		builder = builder.disableRules(disabledRules);
	}
	const results = await builder.analyze();
	expect(results.violations).toEqual([]);
}

/**
 * Creates color-scheme × contrast-mode permutation tests for a given demo path.
 * Tests all 6 combinations: (light|dark) × (default|forced-colors|prefers-contrast).
 * Call at the top level of each spec file:
 *   mediaModeTests(test, "/demo/example-name");
 */
export function mediaModeTests(test, path, disabledRules = []) {
	for (const colorScheme of ["light", "dark"]) {
		test(`axe audit — ${colorScheme} mode`, async ({ page }) => {
			await page.goto(path);
			await page.waitForLoadState("domcontentloaded");
			await page.emulateMedia({ colorScheme });
			await expectNoAxeViolations(page, disabledRules);
		});

		test(`axe audit — ${colorScheme} + forced-colors: active`, async ({
			page,
		}) => {
			await page.goto(path);
			await page.waitForLoadState("domcontentloaded");
			await page.emulateMedia({ colorScheme, forcedColors: "active" });
			await expectNoAxeViolations(page, disabledRules);
		});

		test(`axe audit — ${colorScheme} + prefers-contrast: more`, async ({
			page,
			browserName,
		}) => {
			test.skip(
				browserName !== "chromium",
				"prefers-contrast emulation requires Chromium CDP",
			);
			await page.goto(path);
			await page.waitForLoadState("domcontentloaded");
			await page.emulateMedia({ colorScheme });
			const client = await page.context().newCDPSession(page);
			await client.send("Emulation.setEmulatedMedia", {
				features: [{ name: "prefers-contrast", value: "more" }],
			});
			await expectNoAxeViolations(page, disabledRules);
		});
	}
}

export const contrastModeTests = mediaModeTests;

/**
 * WCAG contrast ratio helpers — injected into the browser via page.evaluate.
 * Parses computed rgb/rgba colors, calculates relative luminance and contrast ratio.
 */
const contrastHelpers = `
function parseColor(str) {
	if (!str || str === 'transparent' || str === 'rgba(0, 0, 0, 0)') return null;
	const m = str.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*([\\d.]+))?\\)/);
	if (m) return { r: +m[1], g: +m[2], b: +m[3], a: m[4] !== undefined ? +m[4] : 1 };
	const cm = str.match(/color\\(srgb\\s+([\\d.]+)\\s+([\\d.]+)\\s+([\\d.]+)(?:\\s*\\/\\s*([\\d.]+))?\\)/);
	if (cm) return { r: Math.round(+cm[1]*255), g: Math.round(+cm[2]*255), b: Math.round(+cm[3]*255), a: cm[4] !== undefined ? +cm[4] : 1 };
	const om = str.match(/oklch\\(([\\d.]+)\\s+([\\d.]+)\\s+([\\d.e+-]+)(?:\\s*\\/\\s*([\\d.]+))?\\)/);
	if (om) {
		const L = +om[1], C = +om[2], h = +om[3], alpha = om[4] !== undefined ? +om[4] : 1;
		const hRad = h * Math.PI / 180;
		const a_ = C * Math.cos(hRad), b_ = C * Math.sin(hRad);
		const l_ = L + 0.3963377774 * a_ + 0.2158037573 * b_;
		const m_ = L - 0.1055613458 * a_ - 0.0638541728 * b_;
		const s_ = L - 0.0894841775 * a_ - 1.2914855480 * b_;
		const l3 = l_ * l_ * l_, m3 = m_ * m_ * m_, s3 = s_ * s_ * s_;
		const lr = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
		const lg = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
		const lb = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3;
		const clamp = v => Math.round(Math.min(255, Math.max(0, (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1/2.4) - 0.055) * 255)));
		return { r: clamp(lr), g: clamp(lg), b: clamp(lb), a: alpha };
	}
	try {
		const ctx = document.createElement('canvas').getContext('2d');
		ctx.fillStyle = '#010203';
		ctx.fillStyle = str;
		const resolved = ctx.fillStyle;
		if (resolved === '#010203') return null;
		if (resolved.startsWith('#')) {
			const r = parseInt(resolved.slice(1,3), 16);
			const g = parseInt(resolved.slice(3,5), 16);
			const b = parseInt(resolved.slice(5,7), 16);
			return { r, g, b, a: 1 };
		}
		const m2 = resolved.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)(?:,\\s*([\\d.]+))?\\)/);
		if (m2) return { r: +m2[1], g: +m2[2], b: +m2[3], a: m2[4] !== undefined ? +m2[4] : 1 };
	} catch(e) {}
	return null;
}
function luminance(c) {
	const [rs, gs, bs] = [c.r / 255, c.g / 255, c.b / 255].map(
		v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
	);
	return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}
function contrastRatio(c1, c2) {
	const l1 = luminance(c1), l2 = luminance(c2);
	const lighter = Math.max(l1, l2), darker = Math.min(l1, l2);
	return (lighter + 0.05) / (darker + 0.05);
}
function blendOnWhite(c) {
	if (!c || c.a >= 1) return c;
	if (!c || c.a === 0) return { r: 255, g: 255, b: 255, a: 1 };
	return {
		r: Math.round(c.r * c.a + 255 * (1 - c.a)),
		g: Math.round(c.g * c.a + 255 * (1 - c.a)),
		b: Math.round(c.b * c.a + 255 * (1 - c.a)),
		a: 1
	};
}
function compositeOver(fg, bg) {
	if (!fg || fg.a === 0) return bg;
	if (fg.a >= 1) return fg;
	return {
		r: Math.round(fg.r * fg.a + bg.r * (1 - fg.a)),
		g: Math.round(fg.g * fg.a + bg.g * (1 - fg.a)),
		b: Math.round(fg.b * fg.a + bg.b * (1 - fg.a)),
		a: 1
	};
}
function getEffectiveBg(el) {
	let node = el;
	const layers = [];
	while (node) {
		const bg = parseColor(window.getComputedStyle(node).backgroundColor);
		if (bg) {
			layers.unshift(bg);
			if (bg.a >= 1) break;
		}
		node = node.parentElement;
	}
	if (layers.length === 0) return { r: 255, g: 255, b: 255, a: 1 };
	let result = blendOnWhite(layers[0]);
	for (let i = 1; i < layers.length; i++) {
		result = compositeOver(layers[i], result);
	}
	return result;
}
function isLargeText(el) {
	const style = window.getComputedStyle(el);
	const size = parseFloat(style.fontSize);
	const weight = parseInt(style.fontWeight) || (style.fontWeight === 'bold' ? 700 : 400);
	return size >= 24 || (size >= 18.66 && weight >= 700);
}
function describeEl(el) {
	const tag = el.tagName.toLowerCase();
	const cls = el.className ? '.' + String(el.className).split(' ')[0] : '';
	const text = (el.textContent || '').trim().slice(0, 25);
	return '<' + tag + cls + '> "' + text + '"';
}
function colorStr(c) {
	return 'rgb(' + c.r + ',' + c.g + ',' + c.b + ')';
}
`;

const interactiveSelector =
	'a[href], button, input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"]), summary';

async function hasNoHorizontalOverflow(page) {
	return page.evaluate(() => {
		const doc = document.documentElement;
		return doc.scrollWidth - doc.clientWidth <= 1;
	});
}

/**
 * Generates 5 viewport/layout WCAG tests for a given demo path.
 * Call at the top level of each spec file:
 *   viewportTests(test, "/demo/example-name");
 */
export function viewportTests(test, path) {
	test("WCAG 2.2 A 2.4.2 Page Titled — page has a non-empty title", async ({
		page,
	}) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");
		const title = await page.title();
		expect(title.trim().length).toBeGreaterThan(0);
	});

	test("WCAG 2.2 AA 1.4.4 Resize Text — no horizontal overflow at 200% zoom (640×480)", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 640, height: 480 });
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");
		expect(await hasNoHorizontalOverflow(page)).toBe(true);
	});

	test("WCAG 2.2 AA 1.4.10 Reflow — no horizontal overflow at 320px viewport", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 320, height: 480 });
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");
		expect(await hasNoHorizontalOverflow(page)).toBe(true);
	});

	test("WCAG 2.2 AA 1.3.4 Orientation — no horizontal overflow in landscape orientation", async ({
		page,
	}) => {
		await page.setViewportSize({ width: 480, height: 320 });
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");
		expect(await hasNoHorizontalOverflow(page)).toBe(true);
	});

	test("WCAG 2.2 AA 1.4.12 Text Spacing — no overflow with WCAG text-spacing overrides", async ({
		page,
	}) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");
		// constructed stylesheet instead of addStyleTag: CSSOM is not subject
		// to CSP style-src, so the strict CSP stays fully enforced
		await page.evaluate((css) => {
			const sheet = new CSSStyleSheet();
			sheet.replaceSync(css);
			document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];
		}, `
			* {
				line-height: 1.5em !important;
				letter-spacing: 0.12em !important;
				word-spacing: 0.16em !important;
			}
			p { margin-bottom: 2em !important; }
		`);
		expect(await hasNoHorizontalOverflow(page)).toBe(true);
	});
}

/**
 * Generates 4 interactive-element WCAG tests for a given demo path.
 * Tests gracefully skip when no interactive elements are found.
 * Call at the top level of each spec file:
 *   interactiveTests(test, "/demo/example-name");
 */
export function interactiveTests(test, path) {
	test("WCAG 2.2 A 2.4.3 Focus Order — Tab order matches DOM order", async ({
		page,
		browserName,
	}) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");

		const elements = await page.$$(interactiveSelector);
		const visible = [];
		for (const el of elements) {
			if (await el.isVisible()) {
				const disabled = await el.evaluate(
					(e) => e.disabled || e.getAttribute("aria-disabled") === "true",
				);
				if (!disabled) visible.push(el);
			}
		}

		// Filter out elements that aren't individually tabbable
		const tabbable = [];
		for (const el of visible) {
			const info = await el.evaluate((e) => {
				const tag = e.tagName.toLowerCase();
				// <option> and <optgroup> are inside <select>, not individually tabbable
				if (tag === "option" || tag === "optgroup") return { skip: true };
				// Skip elements removed from tab order or accessibility tree
				if (
					e.getAttribute("tabindex") === "-1" ||
					e.getAttribute("aria-hidden") === "true"
				)
					return { skip: true };
				// Only one radio per name group gets a Tab stop
				if (tag === "input" && e.type === "radio") {
					const name = e.getAttribute("name");
					const group = name
						? Array.from(
								document.querySelectorAll(
									`input[type="radio"][name="${name}"]`,
								),
							)
						: [e];
					const checked = group.find((r) => r.checked);
					const tabbableRadio = checked || group[0];
					return { skip: e !== tabbableRadio };
				}
				return { skip: false };
			});
			if (info.skip) continue;
			// WebKit on macOS doesn't Tab to <a> or <div> (contenteditable/tabindex) by default
			if (browserName === "webkit") {
				const tag = await el.evaluate((e) => e.tagName.toLowerCase());
				if (tag === "a" || tag === "div") continue;
			}
			tabbable.push(el);
		}

		if (tabbable.length === 0) {
			test.skip(true, "No tabbable elements found");
			return;
		}

		const expectedIds = await Promise.all(
			tabbable.map((el) =>
				el.evaluate((e) => {
					const tag = e.tagName.toLowerCase();
					const type = e.getAttribute("type") || "";
					const name =
						e.getAttribute("name") || e.textContent?.trim().slice(0, 20) || "";
					return `${tag}${type ? `[${type}]` : ""}:${name}`;
				}),
			),
		);

		const focusedIds = [];
		const maxTabs = tabbable.length * 4;
		let prevElement = null;
		for (let i = 0, tabs = 0; i < tabbable.length && tabs < maxTabs; tabs++) {
			await page.keyboard.press("Tab");
			const handle = await page.evaluateHandle(() => document.activeElement);
			const el = handle.asElement();
			if (!el) break;
			const isSame = prevElement
				? await page.evaluate(([a, b]) => a === b, [prevElement, el])
				: false;
			// Skip sub-fields within composite inputs (e.g., date picker segments)
			if (isSame) continue;
			prevElement = el;
			const id = await el.evaluate((e) => {
				if (e === document.body) return null;
				const tag = e.tagName.toLowerCase();
				// Skip option/optgroup focus from base-select
				if (tag === "option" || tag === "optgroup") return "skip";
				const type = e.getAttribute("type") || "";
				const name =
					e.getAttribute("name") || e.textContent?.trim().slice(0, 20) || "";
				return `${tag}${type ? `[${type}]` : ""}:${name}`;
			});
			if (id === null) break;
			if (id === "skip") continue;
			focusedIds.push(id);
			i++;
		}

		expect(focusedIds).toEqual(expectedIds.slice(0, focusedIds.length));
	});

	test("WCAG 2.2 AA 2.5.8 Target Size — interactive elements are at least 24×24px", async ({
		page,
	}) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");

		const elements = await page.$$(interactiveSelector);
		const targets = [];
		for (const el of elements) {
			if (await el.isVisible()) {
				// Skip elements hidden from accessibility tree
				const ariaHidden = await el.getAttribute("aria-hidden");
				if (ariaHidden === "true") continue;
				const box = await el.boundingBox();
				if (box && (box.width > 0 || box.height > 0)) {
					targets.push({ el, box });
				}
			}
		}

		if (targets.length === 0) {
			test.skip(true, "No interactive elements found");
			return;
		}

		const failures = [];
		for (const { el, box } of targets) {
			if (Math.round(box.width) < 24 || Math.round(box.height) < 24) {
				// WCAG 2.5.8 exemption: inline targets within text
				const isInline = await el.evaluate((e) => {
					const style = window.getComputedStyle(e);
					return style.display === "inline";
				});
				if (isInline) continue;

				const desc = await el.evaluate((e) => {
					const tag = e.tagName.toLowerCase();
					const text = e.textContent?.trim().slice(0, 30) || "";
					return `<${tag}> "${text}"`;
				});
				failures.push(
					`${desc} is ${box.width.toFixed(1)}×${box.height.toFixed(1)}px (min 24×24)`,
				);
			}
		}

		expect(failures, "Elements smaller than 24×24px target size").toEqual([]);
	});

	test("WCAG 2.2 AA 2.4.11 Focus Not Obscured — focused elements are not hidden by sticky/fixed elements", async ({
		page,
	}) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");

		const elements = await page.$$(interactiveSelector);
		const visible = [];
		for (const el of elements) {
			if (await el.isVisible()) {
				const disabled = await el.evaluate(
					(e) => e.disabled || e.getAttribute("aria-disabled") === "true",
				);
				if (!disabled) visible.push(el);
			}
		}

		if (visible.length === 0) {
			test.skip(true, "No interactive elements found");
			return;
		}

		const failures = [];
		for (let i = 0; i < visible.length; i++) {
			await page.keyboard.press("Tab");
			const result = await page.evaluate(() => {
				const focused = document.activeElement;
				if (!focused || focused === document.body) return null;
				const rect = focused.getBoundingClientRect();
				const centerX = rect.left + rect.width / 2;
				const centerY = rect.top + rect.height / 2;
				const topEl = document.elementFromPoint(centerX, centerY);
				if (!topEl) return null;
				if (focused.contains(topEl) || topEl.contains(focused)) return null;
				const topStyle = window.getComputedStyle(topEl);
				if (topStyle.position === "fixed" || topStyle.position === "sticky") {
					const tag = focused.tagName.toLowerCase();
					const text = focused.textContent?.trim().slice(0, 30) || "";
					return `<${tag}> "${text}" obscured by <${topEl.tagName.toLowerCase()}>`;
				}
				return null;
			});
			if (result) failures.push(result);
		}

		expect(
			failures,
			"Focused elements obscured by sticky/fixed elements",
		).toEqual([]);
	});

	test("WCAG 2.2 AAA 2.4.13 Focus Appearance — focus indicator is at least 2px", async ({
		page,
	}) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");

		const elements = await page.$$(interactiveSelector);
		const visible = [];
		for (const el of elements) {
			if (await el.isVisible()) {
				const disabled = await el.evaluate(
					(e) => e.disabled || e.getAttribute("aria-disabled") === "true",
				);
				if (!disabled) visible.push(el);
			}
		}

		if (visible.length === 0) {
			test.skip(true, "No interactive elements found");
			return;
		}

		const failures = [];
		for (let i = 0; i < visible.length; i++) {
			await page.keyboard.press("Tab");
			const result = await page.evaluate(`(() => {
				${contrastHelpers}
				const e = document.activeElement;
				if (!e || e === document.body) return null;
				const style = window.getComputedStyle(e);
				const tag = e.tagName.toLowerCase();
				const text = e.textContent?.trim().slice(0, 30) || "";
				const label = '<' + tag + '> "' + text + '"';

				const outlineWidth = parseFloat(style.outlineWidth) || 0;
				const outlineStyle = style.outlineStyle;
				const hasOutline = outlineStyle !== "none" && outlineWidth >= 2;

				// Check border as a valid focus indicator
				const borderWidths = [
					parseFloat(style.borderTopWidth) || 0,
					parseFloat(style.borderRightWidth) || 0,
					parseFloat(style.borderBottomWidth) || 0,
					parseFloat(style.borderLeftWidth) || 0,
				];
				const minBorder = Math.min(...borderWidths);
				const borderStyle = style.borderStyle;
				const hasBorder = borderStyle !== "none" && minBorder >= 2;

				// Parse box-shadow for >= 2px visible indicator
				// box-shadow: offset-x offset-y blur spread color
				const boxShadow = style.boxShadow;
				let hasBoxShadow = false;
				if (boxShadow && boxShadow !== "none") {
					// Match each shadow value; check spread or blur >= 2px
					const shadows = boxShadow.split(/,(?![^(]*\\))/);
					for (const shadow of shadows) {
						const nums = shadow.match(/(-?[\\d.]+)px/g);
						if (nums && nums.length >= 3) {
							const blur = parseFloat(nums[2]) || 0;
							const spread = nums[3] ? parseFloat(nums[3]) : 0;
							if (spread >= 2 || blur >= 2) {
								hasBoxShadow = true;
								break;
							}
						}
					}
				}

				if (!hasOutline && !hasBoxShadow && !hasBorder) {
					return label + ' — no adequate indicator (outline: ' + outlineWidth + 'px ' + outlineStyle + ')';
				}

				// Contrast check: indicator color vs background (3:1 required)
				const outlineOffset = parseFloat(style.outlineOffset) || 0;
				const bg = hasOutline && outlineOffset > 0
					? getEffectiveBg(e.parentElement || e)
					: getEffectiveBg(e);
				let indicatorColor = null;
				if (hasOutline) {
					indicatorColor = parseColor(style.outlineColor);
				} else if (hasBorder) {
					indicatorColor = parseColor(style.borderColor);
				} else if (hasBoxShadow) {
					// Extract color from first qualifying shadow
					const colorMatch = boxShadow.match(/rgba?\\([^)]+\\)|#[0-9a-fA-F]{3,8}|[a-z]+(?=\\s|$)/);
					if (colorMatch) indicatorColor = parseColor(colorMatch[0]);
				}

				if (indicatorColor && bg) {
					const fg = blendOnWhite(indicatorColor);
					const bgBlended = blendOnWhite(bg);
					if (fg && bgBlended) {
						const ratio = contrastRatio(fg, bgBlended);
						if (ratio < 3) {
							return label + ' — indicator contrast ' + ratio.toFixed(2) + ':1 < 3:1 (' + colorStr(fg) + ' on ' + colorStr(bgBlended) + ')';
						}
					}
				}

				return null;
			})()`);
			if (result) failures.push(result);
		}

		expect(
			failures,
			"Focus indicators smaller than 2px or insufficient contrast",
		).toEqual([]);
	});
}

/**
 * Generates tests for WCAG 1.4.13 Content on Hover or Focus.
 * Checks that popover/tooltip content triggered by buttons is:
 * - Dismissible via Escape without moving pointer
 * - Hoverable (pointer can move to content)
 * - Persistent until user dismisses
 * Skips if no popover triggers found on the page.
 * Call at the top level of each spec file:
 *   hoverFocusContentTests(test, "/demo/example-name");
 */
export function hoverFocusContentTests(test, path) {
	test("WCAG 2.2 AA 1.4.13 Content on Hover or Focus — popovers are dismissible via Escape", async ({
		page,
	}) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");

		const triggers = await page.$$("[popovertarget]");
		if (triggers.length === 0) {
			test.skip(true, "No popover triggers found");
			return;
		}

		for (const trigger of triggers) {
			// mobile-only triggers (e.g. the header hamburger) are hidden at
			// the test viewport and can't be clicked
			if (!(await trigger.isVisible())) continue;
			const targetId = await trigger.evaluate((e) =>
				e.getAttribute("popovertarget"),
			);
			const popover = page.locator(`#${targetId}`);

			await trigger.click();
			await expect(popover).toBeVisible();

			await page.keyboard.press("Escape");
			await expect(popover).toBeHidden();
		}
	});

	test("WCAG 2.2 AA 1.4.13 Content on Hover or Focus — popover content is hoverable", async ({
		page,
	}) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");

		const triggers = await page.$$("[popovertarget]");
		if (triggers.length === 0) {
			test.skip(true, "No popover triggers found");
			return;
		}

		for (const trigger of triggers) {
			// mobile-only triggers (e.g. the header hamburger) are hidden at
			// the test viewport and can't be clicked
			if (!(await trigger.isVisible())) continue;
			const targetId = await trigger.evaluate((e) =>
				e.getAttribute("popovertarget"),
			);
			const popover = page.locator(`#${targetId}`);

			await trigger.click();
			await expect(popover).toBeVisible();

			const box = await popover.boundingBox();
			if (box) {
				await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
				await expect(popover).toBeVisible();
			}

			await page.keyboard.press("Escape");
		}
	});

	test("WCAG 2.2 AA 1.4.13 Content on Hover or Focus — popover persists until dismissed", async ({
		page,
	}) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");

		const triggers = await page.$$("[popovertarget]");
		if (triggers.length === 0) {
			test.skip(true, "No popover triggers found");
			return;
		}

		for (const trigger of triggers) {
			// mobile-only triggers (e.g. the header hamburger) are hidden at
			// the test viewport and can't be clicked
			if (!(await trigger.isVisible())) continue;
			const targetId = await trigger.evaluate((e) =>
				e.getAttribute("popovertarget"),
			);
			const popover = page.locator(`#${targetId}`);

			await trigger.click();
			await expect(popover).toBeVisible();

			// Content should persist — wait briefly and verify still visible
			await page.waitForTimeout(500);
			await expect(popover).toBeVisible();

			await page.keyboard.press("Escape");
		}
	});

	test("WCAG 2.2 AA 1.4.13 Content on Hover or Focus — no title attributes used as tooltips", async ({
		page,
	}) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");

		const titledElements = await page.$$("[title]");
		const failures = [];
		for (const el of titledElements) {
			const result = await el.evaluate((e) => {
				if (
					e.tagName === "IFRAME" ||
					e.tagName === "SVG" ||
					e.tagName === "ABBR"
				)
					return null;
				const title = e.getAttribute("title");
				if (!title?.trim()) return null;
				const tag = e.tagName.toLowerCase();
				const text = (e.textContent || "").trim().slice(0, 25);
				return `<${tag}> "${text}" has title="${title.slice(0, 40)}" — title tooltips are not hoverable or persistent`;
			});
			if (result) failures.push(result);
		}

		if (failures.length === 0 && titledElements.length === 0) {
			test.skip(true, "No title attributes found");
			return;
		}

		expect(
			failures,
			"title attributes used as tooltips violate 1.4.13",
		).toEqual([]);
	});
}

/**
 * Generates contrast ratio tests for both light and dark color schemes.
 * Tests text, buttons, links, borders, and focus rings against WCAG thresholds.
 * Call at the top level of each spec file:
 *   contrastTests(test, "/demo/example-name");
 */
export function contrastTests(test, path) {
	for (const colorScheme of ["light", "dark"]) {
		test(`WCAG 2.2 AA 1.4.3 Contrast — text contrast ≥ 4.5:1 (${colorScheme})`, async ({
			page,
		}) => {
			await page.emulateMedia({ colorScheme });
			await page.goto(path);
			await page.waitForLoadState("domcontentloaded");

			const failures = await page.evaluate(`(() => {
				${contrastHelpers}
				const failures = [];
				const textEls = document.querySelectorAll(
					'p, span, li, td, th, dt, dd, label, legend, h1, h2, h3, h4, h5, h6, a, button, blockquote, figcaption, caption, summary, small, strong, em, b, i, u, s, del, ins, mark, abbr, cite, code, kbd, samp, var, dfn, sub, sup, time, address'
				);
				for (const el of textEls) {
					if (!el.offsetParent && el.tagName !== 'BODY' && window.getComputedStyle(el).position !== 'fixed') continue;
					const text = (el.textContent || '').trim();
					if (!text) continue;
					const style = window.getComputedStyle(el);
					if (style.visibility === 'hidden' || style.display === 'none') continue;
					if (parseFloat(style.opacity) === 0) continue;
					const fg = parseColor(style.color);
					if (!fg) continue;
					const bg = getEffectiveBg(el);
					const fgResolved = compositeOver(fg, bg);
					const ratio = contrastRatio(fgResolved, bg);
					const minRatio = isLargeText(el) ? 3 : 4.5;
					if (ratio < minRatio) {
						failures.push(
							describeEl(el) + ': ' + ratio.toFixed(2) + ':1 (need ' + minRatio + ':1) fg=' + colorStr(fgResolved) + ' bg=' + colorStr(bg)
						);
					}
				}
				return failures;
			})()`);

			expect(failures, `Text contrast failures (${colorScheme})`).toEqual([]);
		});

		test(`WCAG 2.2 AA 1.4.3 Contrast — button text on button background ≥ 4.5:1 (${colorScheme})`, async ({
			page,
		}) => {
			await page.emulateMedia({ colorScheme });
			await page.goto(path);
			await page.waitForLoadState("domcontentloaded");

			const buttons = await page.$$(
				"button, [role='button'], input[type='submit'], input[type='button'], a.button",
			);
			if (buttons.length === 0) {
				test.skip(true, "No buttons found");
				return;
			}

			const failures = await page.evaluate(`(() => {
				${contrastHelpers}
				const failures = [];
				const btns = document.querySelectorAll("button, [role='button'], input[type='submit'], input[type='button'], a.button");
				for (const btn of btns) {
					const style = window.getComputedStyle(btn);
					if (style.visibility === 'hidden' || style.display === 'none') continue;
					const fg = parseColor(style.color);
					const btnBg = parseColor(style.backgroundColor);
					if (!fg) continue;
					const parentBg = getEffectiveBg(btn.parentElement || btn);
					const effectiveBg = btnBg && btnBg.a > 0 ? compositeOver(btnBg, parentBg) : parentBg;
					const fgResolved = compositeOver(fg, effectiveBg);
					const ratio = contrastRatio(fgResolved, effectiveBg);
					const minRatio = isLargeText(btn) ? 3 : 4.5;
					if (ratio < minRatio) {
						failures.push(
							describeEl(btn) + ': ' + ratio.toFixed(2) + ':1 (need ' + minRatio + ':1) fg=' + colorStr(fgResolved) + ' bg=' + colorStr(effectiveBg)
						);
					}
				}
				return failures;
			})()`);

			expect(
				failures,
				`Button text contrast failures (${colorScheme})`,
			).toEqual([]);
		});

		test(`WCAG 2.2 AAA 1.4.6 Contrast (Enhanced) — text contrast ≥ 7:1 (${colorScheme})`, async ({
			page,
		}) => {
			await page.emulateMedia({ colorScheme });
			await page.goto(path);
			await page.waitForLoadState("domcontentloaded");

			const failures = await page.evaluate(`(() => {
				${contrastHelpers}
				const failures = [];
				const textEls = document.querySelectorAll(
					'p, span, li, td, th, dt, dd, label, legend, h1, h2, h3, h4, h5, h6, a, button, blockquote, figcaption, caption, summary, small, strong, em, b, i, u, s, del, ins, mark, abbr, cite, code, kbd, samp, var, dfn, sub, sup, time, address'
				);
				for (const el of textEls) {
					if (!el.offsetParent && el.tagName !== 'BODY' && window.getComputedStyle(el).position !== 'fixed') continue;
					const text = (el.textContent || '').trim();
					if (!text) continue;
					const style = window.getComputedStyle(el);
					if (style.visibility === 'hidden' || style.display === 'none') continue;
					if (parseFloat(style.opacity) === 0) continue;
					const fg = parseColor(style.color);
					if (!fg) continue;
					const bg = getEffectiveBg(el);
					const fgResolved = compositeOver(fg, bg);
					const ratio = contrastRatio(fgResolved, bg);
					const minRatio = isLargeText(el) ? 4.5 : 7;
					if (ratio < minRatio) {
						failures.push(
							describeEl(el) + ': ' + ratio.toFixed(2) + ':1 (need ' + minRatio + ':1) fg=' + colorStr(fgResolved) + ' bg=' + colorStr(bg)
						);
					}
				}
				return failures;
			})()`);

			expect(
				failures,
				`Enhanced text contrast failures (${colorScheme})`,
			).toEqual([]);
		});

		test(`WCAG 2.2 AAA 1.4.6 Contrast (Enhanced) — button text ≥ 7:1 (${colorScheme})`, async ({
			page,
		}) => {
			await page.emulateMedia({ colorScheme });
			await page.goto(path);
			await page.waitForLoadState("domcontentloaded");

			const buttons = await page.$$(
				"button, [role='button'], input[type='submit'], input[type='button'], a.button",
			);
			if (buttons.length === 0) {
				test.skip(true, "No buttons found");
				return;
			}

			const failures = await page.evaluate(`(() => {
				${contrastHelpers}
				const failures = [];
				const btns = document.querySelectorAll("button, [role='button'], input[type='submit'], input[type='button'], a.button");
				for (const btn of btns) {
					const style = window.getComputedStyle(btn);
					if (style.visibility === 'hidden' || style.display === 'none') continue;
					const fg = parseColor(style.color);
					const btnBg = parseColor(style.backgroundColor);
					if (!fg) continue;
					const parentBg = getEffectiveBg(btn.parentElement || btn);
					const effectiveBg = btnBg && btnBg.a > 0 ? compositeOver(btnBg, parentBg) : parentBg;
					const fgResolved = compositeOver(fg, effectiveBg);
					const ratio = contrastRatio(fgResolved, effectiveBg);
					const minRatio = isLargeText(btn) ? 4.5 : 7;
					if (ratio < minRatio) {
						failures.push(
							describeEl(btn) + ': ' + ratio.toFixed(2) + ':1 (need ' + minRatio + ':1) fg=' + colorStr(fgResolved) + ' bg=' + colorStr(effectiveBg)
						);
					}
				}
				return failures;
			})()`);

			expect(
				failures,
				`Enhanced button text contrast failures (${colorScheme})`,
			).toEqual([]);
		});

		test(`WCAG 2.2 AA 1.4.11 Non-text Contrast — borders ≥ 3:1 against background (${colorScheme})`, async ({
			page,
		}) => {
			await page.emulateMedia({ colorScheme });
			await page.goto(path);
			await page.waitForLoadState("domcontentloaded");

			const failures = await page.evaluate(`(() => {
				${contrastHelpers}
				const failures = [];
				const els = document.querySelectorAll('input, select, textarea, button, [role="button"], fieldset, details, blockquote, table, hr');
				for (const el of els) {
					const style = window.getComputedStyle(el);
					if (style.visibility === 'hidden' || style.display === 'none') continue;
					if (!el.offsetParent && style.position !== 'fixed') continue;
					const sides = ['Top', 'Right', 'Bottom', 'Left'];
					const bg = getEffectiveBg(el.parentElement || el);
					for (const side of sides) {
						const width = parseFloat(style['border' + side + 'Width']);
						if (!width || width < 1) continue;
						const borderStyle = style['border' + side + 'Style'];
						if (borderStyle === 'none' || borderStyle === 'hidden') continue;
						const border = parseColor(style['border' + side + 'Color']);
						if (!border) continue;
						const borderResolved = compositeOver(border, bg);
						const ratio = contrastRatio(borderResolved, bg);
						if (ratio < 3) {
							failures.push(
								describeEl(el) + ' border-' + side.toLowerCase() + ': ' + ratio.toFixed(2) + ':1 (need 3:1) border=' + colorStr(borderResolved) + ' bg=' + colorStr(bg)
							);
							break;
						}
					}
				}
				return failures;
			})()`);

			expect(failures, `Border contrast failures (${colorScheme})`).toEqual([]);
		});

		test(`WCAG 2.2 AA 1.4.11 Non-text Contrast — focus ring ≥ 3:1 against background (${colorScheme})`, async ({
			page,
		}) => {
			await page.emulateMedia({ colorScheme });
			await page.goto(path);
			await page.waitForLoadState("domcontentloaded");

			const elements = await page.$$(interactiveSelector);
			const visible = [];
			for (const el of elements) {
				if (await el.isVisible()) {
					const disabled = await el.evaluate(
						(e) => e.disabled || e.getAttribute("aria-disabled") === "true",
					);
					if (!disabled) visible.push(el);
				}
			}

			if (visible.length === 0) {
				test.skip(true, "No interactive elements found");
				return;
			}

			const failures = [];
			for (const el of visible) {
				await el.focus();
				const result = await el.evaluate(`((el) => {
					${contrastHelpers}
					const style = window.getComputedStyle(el);
					const outlineColor = parseColor(style.outlineColor);
					const outlineStyle = style.outlineStyle;
					const outlineWidth = parseFloat(style.outlineWidth) || 0;
					if (!outlineColor || outlineStyle === 'none' || outlineWidth < 1) return null;
					const bg = getEffectiveBg(el);
					const outlineResolved = compositeOver(outlineColor, bg);
					const ratio = contrastRatio(outlineResolved, bg);
					if (ratio < 3) {
						return describeEl(el) + ': focus ring ' + ratio.toFixed(2) + ':1 (need 3:1) outline=' + colorStr(outlineResolved) + ' bg=' + colorStr(bg);
					}
					return null;
				})`);
				if (result) failures.push(result);
			}

			expect(failures, `Focus ring contrast failures (${colorScheme})`).toEqual(
				[],
			);
		});
	}
}

/**
 * Generates page-level WCAG tests for layout pages.
 * Tests consistent help, context-sensitive help, error prevention, and redundant entry.
 * Call at the top level of layout spec files:
 *   layoutTests(test, "/layout/form", ["/layout/article", "/layout/documentation"]);
 *
 * @param {Function} test - Playwright test function
 * @param {string} path - The layout page path
 * @param {string[]} otherPaths - Other layout page paths to compare for consistency
 */
export function layoutTests(test, path, otherPaths) {
	test("WCAG 2.2 AA 3.2.6 Consistent Help — help/contact links appear in consistent position across pages", async ({
		page,
	}) => {
		if (otherPaths.length === 0) {
			test.skip(true, "No other pages to compare");
			return;
		}

		async function getFooterHelpLinks(p, url) {
			await p.goto(url);
			await p.waitForLoadState("domcontentloaded");
			return p.evaluate(() => {
				const footer =
					document.querySelector("footer#footer") ||
					document.querySelector("footer");
				if (!footer) return [];
				const links = footer.querySelectorAll("a[href]");
				return Array.from(links).map((a) => {
					const href = a.getAttribute("href");
					const text = (a.textContent || "").trim().toLowerCase();
					return { href, text };
				});
			});
		}

		const baseLinks = await getFooterHelpLinks(page, path);
		if (baseLinks.length === 0) {
			test.skip(true, "No footer links found");
			return;
		}

		const baseHrefs = baseLinks.map((l) => l.href).sort();

		const failures = [];
		for (const otherPath of otherPaths) {
			const otherLinks = await getFooterHelpLinks(page, otherPath);
			const otherHrefs = otherLinks.map((l) => l.href).sort();

			const missing = baseHrefs.filter((h) => !otherHrefs.includes(h));
			for (const href of missing) {
				const link = baseLinks.find((l) => l.href === href);
				failures.push(
					`"${link.text}" (${href}) present in ${path} footer but missing from ${otherPath}`,
				);
			}
		}

		expect(
			failures,
			"Footer help/contact links inconsistent across pages",
		).toEqual([]);
	});

	test("WCAG 2.2 AAA 3.3.5 Help — form inputs have context-sensitive help (hints via aria-describedby)", async ({
		page,
	}) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");

		const inputs = await page.$$(
			'form input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="search"]), form textarea, form select',
		);

		if (inputs.length === 0) {
			test.skip(true, "No form inputs found");
			return;
		}

		const failures = [];
		for (const input of inputs) {
			if (!(await input.isVisible())) continue;
			const result = await input.evaluate((el) => {
				const describedby = el.getAttribute("aria-describedby");
				if (describedby) {
					const ids = describedby.split(/\s+/);
					const hasHint = ids.some((id) => {
						const ref = document.getElementById(id);
						return ref && !ref.textContent?.includes("error");
					});
					if (hasHint) return null;
				}
				// Accept a help/guidance link within the form or its parent section as sufficient context-sensitive help
				const form = el.closest("form");
				if (form) {
					const parent = form.closest("section, search, aside") || form;
					const helpLink = parent.querySelector("a[href]");
					if (helpLink) return null;
				}
				const tag = el.tagName.toLowerCase();
				const name =
					el.getAttribute("name") ||
					el.getAttribute("id") ||
					el.getAttribute("type") ||
					"";
				return `<${tag}> name="${name}" has no hint text (aria-describedby)`;
			});
			if (result) failures.push(result);
		}

		expect(failures, "Form inputs without context-sensitive help").toEqual([]);
	});

	test("WCAG 2.2 AAA 3.3.6 Error Prevention — forms are checkable before submission", async ({
		page,
	}) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");

		const forms = await page.$$("form");
		if (forms.length === 0) {
			test.skip(true, "No forms found");
			return;
		}

		const failures = [];
		for (const form of forms) {
			const formInfo = await form.evaluate((el) => {
				const action = el.getAttribute("action") || "";
				const method = (el.getAttribute("method") || "GET").toUpperCase();
				return {
					action,
					method,
					desc: `<form action="${action}" method="${method}">`,
				};
			});

			// GET forms (search/filter) are idempotent and don't need error prevention
			if (formInfo.method === "GET") continue;

			const hasSubmitButton = await form.evaluate((el) => {
				const submit = el.querySelector(
					'button[type="submit"], input[type="submit"], [is="ds-form-submit"] button, button:not([type])',
				);
				return !!submit;
			});
			if (!hasSubmitButton) {
				failures.push(
					`${formInfo.desc} has no explicit submit button — may auto-submit without review`,
				);
			}

			const hasErrorRegion = await form.evaluate((el) => {
				const parent = el.closest("section") || el.parentElement;
				if (!parent) return false;
				return !!parent.querySelector(
					'[role="alert"], .form-errors, [aria-live]',
				);
			});
			if (!hasErrorRegion) {
				failures.push(
					`${formInfo.desc} has no error summary region ([role="alert"] or .form-errors)`,
				);
			}
		}

		expect(failures, "Forms lacking error prevention mechanisms").toEqual([]);
	});

	test("WCAG 2.2 A 3.3.7 Redundant Entry — form inputs use autocomplete where appropriate", async ({
		page,
	}) => {
		await page.goto(path);
		await page.waitForLoadState("domcontentloaded");

		const inputs = await page.$$(
			'form input:not([type="hidden"]):not([type="submit"]):not([type="button"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), form textarea, form select',
		);

		if (inputs.length === 0) {
			test.skip(true, "No form inputs found");
			return;
		}

		const autocompleteTypes = [
			"name",
			"given-name",
			"family-name",
			"email",
			"tel",
			"street-address",
			"address-line1",
			"address-line2",
			"address-level1",
			"address-level2",
			"postal-code",
			"country",
			"cc-name",
			"cc-number",
			"username",
			"new-password",
			"current-password",
			"one-time-code",
			"organization",
			"bday",
			"url",
		];

		const failures = [];
		for (const input of inputs) {
			if (!(await input.isVisible())) continue;
			const result = await input.evaluate((el, types) => {
				const autocomplete = el.getAttribute("autocomplete");
				if (autocomplete && autocomplete !== "off") return null;
				const name = (el.getAttribute("name") || "").toLowerCase();
				const id = (el.getAttribute("id") || "").toLowerCase();
				const type = el.getAttribute("type") || "text";
				const knownField = types.some(
					(t) =>
						name.includes(t.replace("-", "")) ||
						id.includes(t.replace("-", "")) ||
						name.includes(t) ||
						id.includes(t),
				);
				if (!knownField) return null;
				const tag = el.tagName.toLowerCase();
				return `<${tag}> name="${el.getAttribute("name") || ""}" id="${el.getAttribute("id") || ""}" type="${type}" — likely personal data field missing autocomplete attribute`;
			}, autocompleteTypes);
			if (result) failures.push(result);
		}

		expect(failures, "Personal data inputs missing autocomplete").toEqual([]);
	});
}
