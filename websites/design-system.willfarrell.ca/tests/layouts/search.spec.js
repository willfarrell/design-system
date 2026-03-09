import { expect, test } from "@playwright/test";
import {
	contrastTests,
	expectNoAxeViolations,
	hoverFocusContentTests,
	interactiveTests,
	layoutTests,
	mediaModeTests,
	viewportTests,
} from "../a11y.js";

const path = "/layout/search";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — has heading hierarchy", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const headings = await page.$$eval("h1, h2, h3, h4, h5, h6", (els) =>
		els.map((el) => Number.parseInt(el.tagName[1], 10)),
	);
	expect(headings.length).toBeGreaterThan(0);
	expect(headings[0]).toBe(1);

	for (let i = 1; i < headings.length; i++) {
		expect(headings[i] - headings[i - 1]).toBeLessThanOrEqual(1);
	}
});

test("WCAG 2.2 A 2.4.1 Bypass Blocks — has navigation and main landmarks", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const main = page.locator("main");
	await expect(main).toHaveCount(1);

	const search = page.locator("search");
	const searchCount = await search.count();
	expect(searchCount).toBeGreaterThan(0);
});

test("WCAG 2.2 A 3.3.2 Labels or Instructions — search input has label", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const searchInput = page.locator('input[type="search"]');
	const count = await searchInput.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const input = searchInput.nth(i);
		const id = await input.getAttribute("id");
		const ariaLabel = await input.getAttribute("aria-label");
		const ariaLabelledby = await input.getAttribute("aria-labelledby");
		const hasLabel =
			ariaLabel !== null ||
			ariaLabelledby !== null ||
			(id !== null && (await page.locator(`label[for="${id}"]`).count()) > 0);
		expect(hasLabel, `search input[${i}] should have an associated label`).toBe(
			true,
		);
	}
});

test("WCAG 2.2 AA 2.4.6 Headings and Labels — filter sections have headings or legends", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const fieldsets = page.locator("search fieldset");
	const count = await fieldsets.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const fieldset = fieldsets.nth(i);
		const legend = fieldset.locator("legend");
		const legendCount = await legend.count();
		const ariaLabel = await fieldset.getAttribute("aria-label");
		const ariaLabelledby = await fieldset.getAttribute("aria-labelledby");
		const hasLabel =
			legendCount > 0 || ariaLabel !== null || ariaLabelledby !== null;
		expect(
			hasLabel,
			`fieldset[${i}] should have a legend or accessible label`,
		).toBe(true);
	}
});

test("WCAG 2.2 A 1.3.2 Meaningful Sequence — DOM order matches visual order", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const reordered = await page.$$eval("*", (els) =>
		els
			.filter((el) => {
				const style = window.getComputedStyle(el);
				if (style.order === "" || style.order === "0") return false;
				// Card .text uses order:1 intentionally per inclusive-components.design/cards/
				// DOM order (text before image) is the meaningful sequence for screen readers
				if (el.closest("[is='ds-card']") && el.classList.contains("text"))
					return false;
				return true;
			})
			.map(
				(el) =>
					`<${el.tagName.toLowerCase()}> order:${window.getComputedStyle(el).order}`,
			),
	);
	expect(
		reordered,
		"Elements with CSS order != 0 may break meaningful sequence",
	).toEqual([]);
});

test("WCAG 2.2 AAA 2.4.10 Section Headings — sections organized with headings", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const sections = page.locator("section");
	const count = await sections.count();
	expect(count).toBeGreaterThan(0);

	const failures = [];
	for (let i = 0; i < count; i++) {
		const section = sections.nth(i);
		const headings = section.locator("h1, h2, h3, h4, h5, h6, hgroup");
		const headingCount = await headings.count();
		let hasOwnHeading = false;
		for (let j = 0; j < headingCount; j++) {
			const belongs = await headings.nth(j).evaluate(
				(el, sectionEl) => {
					return el.closest("section") === sectionEl;
				},
				await section.elementHandle(),
			);
			if (belongs) {
				hasOwnHeading = true;
				break;
			}
		}
		if (!hasOwnHeading) {
			const id = (await section.getAttribute("id")) || `[${i}]`;
			failures.push(`section${id} has no heading`);
		}
	}
	expect(failures, "Sections without headings").toEqual([]);
});

test("WCAG 2.2 AAA 2.4.9 Link Purpose (Link Only) — link text meaningful without context", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const genericTexts = [
		"click here",
		"here",
		"read more",
		"more",
		"link",
		"learn more",
	];
	const links = page.locator("a[href]");
	const count = await links.count();

	const failures = [];
	for (let i = 0; i < count; i++) {
		const link = links.nth(i);
		if (!(await link.isVisible())) continue;
		const ariaHidden = await link.getAttribute("aria-hidden");
		if (ariaHidden === "true") continue;
		const text = (await link.textContent()).trim().toLowerCase();
		const ariaLabel = await link.getAttribute("aria-label");
		const effectiveText = ariaLabel?.trim().toLowerCase() || text;
		if (genericTexts.includes(effectiveText)) {
			failures.push(`<a> "${text}" is generic link text`);
		}
	}
	expect(
		failures,
		"Links with generic text that lack independent meaning",
	).toEqual([]);
});

test("WCAG 2.2 AAA 1.4.8 Visual Presentation — line width, spacing, and alignment", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const failures = await page.$$eval(
		"p, li, dd, td, th, blockquote, figcaption",
		(els) => {
			const issues = [];
			for (const el of els) {
				if (!el.offsetParent) continue;
				const style = window.getComputedStyle(el);
				const tag = el.tagName.toLowerCase();
				const text = el.textContent?.trim().slice(0, 30) || "";
				const desc = `<${tag}> "${text}"`;

				if (style.textAlign === "justify") {
					issues.push(`${desc} uses text-align: justify`);
				}

				const lineHeight = parseFloat(style.lineHeight);
				const fontSize = parseFloat(style.fontSize);
				if (lineHeight && fontSize && lineHeight / fontSize < 1.5) {
					issues.push(
						`${desc} line-height ${(lineHeight / fontSize).toFixed(2)} < 1.5`,
					);
				}

				if (el.scrollWidth > 0) {
					const measure = document.createElement("span");
					measure.style.cssText =
						"position:absolute;visibility:hidden;width:1ch;font:inherit;";
					el.appendChild(measure);
					const ch = measure.getBoundingClientRect().width;
					measure.remove();
					const contentWidth =
						el.clientWidth -
						parseFloat(style.paddingLeft) -
						parseFloat(style.paddingRight);
					const charsWide = contentWidth / ch;
					if (charsWide > 80) {
						issues.push(
							`${desc} line width ~${Math.round(charsWide)}ch > 80ch`,
						);
					}
				}
			}
			return issues;
		},
	);
	expect(failures, "Visual presentation issues (1.4.8)").toEqual([]);
});

test("WCAG 2.2 AAA 3.2.5 Change on Request — no unexpected context changes", async ({
	page,
}) => {
	const navigations = [];
	page.on("framenavigated", (frame) => {
		if (frame === page.mainFrame()) {
			navigations.push(frame.url());
		}
	});

	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	const initialUrl = page.url();

	const finalUrl = page.url();
	expect(finalUrl).toBe(initialUrl);

	const blankLinks = page.locator('a[target="_blank"]');
	const blankCount = await blankLinks.count();
	const failures = [];
	for (let i = 0; i < blankCount; i++) {
		const link = blankLinks.nth(i);
		const text = (await link.textContent()).trim();
		const ariaLabel = (await link.getAttribute("aria-label")) || "";
		const title = (await link.getAttribute("title")) || "";
		const hasNewWindowHint =
			/new (window|tab)/i.test(text) ||
			/new (window|tab)/i.test(ariaLabel) ||
			/new (window|tab)/i.test(title) ||
			(await link.locator(".visually-hidden").count()) > 0;
		if (!hasNewWindowHint) {
			failures.push(
				`<a> "${text.slice(0, 30)}" opens new window without warning`,
			);
		}
	}
	expect(failures, "Links opening new windows without user warning").toEqual(
		[],
	);

	const selects = page.locator("select");
	const selectCount = await selects.count();
	for (let i = 0; i < selectCount; i++) {
		const select = selects.nth(i);
		if (!(await select.isVisible())) continue;
		const options = select.locator("option");
		const optCount = await options.count();
		if (optCount > 1) {
			navigations.length = 0;
			await select.selectOption({ index: 1 });
			await page.waitForTimeout(500);
			const unexpectedNavs = navigations.filter((url) => url !== initialUrl);
			expect(
				unexpectedNavs,
				`select[${i}] triggered navigation on change`,
			).toEqual([]);
		}
	}
});

test("WCAG 2.2 AA 2.4.11 Focus Not Obscured — focus outline not clipped by overflow containers", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	// Find interactive elements inside overflow-clipping containers
	const targets = await page.evaluate(() => {
		const interactiveSelector =
			'a[href], button, input:not([type="hidden"]), select, textarea, [tabindex]:not([tabindex="-1"]), summary';
		const results = [];

		const allElements = document.querySelectorAll("*");
		for (const container of allElements) {
			const style = window.getComputedStyle(container);
			const overflowX = style.overflowX;
			const overflowY = style.overflowY;
			const clips =
				overflowX === "hidden" ||
				overflowX === "scroll" ||
				overflowX === "auto" ||
				overflowY === "hidden" ||
				overflowY === "scroll" ||
				overflowY === "auto";
			if (!clips) continue;

			const focusables = container.querySelectorAll(interactiveSelector);
			for (const el of focusables) {
				if (!el.offsetParent) continue;
				const elStyle = window.getComputedStyle(el);
				if (elStyle.visibility === "hidden" || elStyle.display === "none")
					continue;
				const tag = el.tagName.toLowerCase();
				const type = el.getAttribute("type") || "";
				const name = el.getAttribute("name") || el.getAttribute("id") || "";
				const containerTag = container.tagName.toLowerCase();
				const containerId = container.getAttribute("id") || "";
				results.push({ tag, type, name, containerTag, containerId });
			}
		}
		return results;
	});

	const failures = [];
	for (const target of targets) {
		// Build a selector to find this specific element
		let selector = target.tag;
		if (target.type) selector += `[type="${target.type}"]`;
		if (target.name) {
			const nameAttr =
				target.tag === "input" ||
				target.tag === "select" ||
				target.tag === "textarea"
					? "name"
					: "id";
			selector += `[${nameAttr}="${target.name}"]`;
		}

		const el = page.locator(selector).first();
		if (!(await el.isVisible())) continue;

		// Focus via keyboard to trigger :focus-visible styles
		await el.focus();

		const result = await el.evaluate((e) => {
			const style = window.getComputedStyle(e);
			const outlineOffset = Number.parseFloat(style.outlineOffset) || 0;
			const outlineWidth = Number.parseFloat(style.outlineWidth) || 0;
			if (outlineOffset <= 0 && outlineWidth <= 0) return null;

			const totalExtension = outlineOffset + outlineWidth;
			if (totalExtension <= 0) return null;

			const elRect = e.getBoundingClientRect();

			// Walk up to find the nearest overflow-clipping ancestor
			let container = e.parentElement;
			while (container) {
				const cStyle = window.getComputedStyle(container);
				const ox = cStyle.overflowX;
				const oy = cStyle.overflowY;
				if (
					ox === "hidden" ||
					ox === "scroll" ||
					ox === "auto" ||
					oy === "hidden" ||
					oy === "scroll" ||
					oy === "auto"
				) {
					break;
				}
				container = container.parentElement;
			}
			if (!container) return null;

			const containerRect = container.getBoundingClientRect();
			const _containerPaddingLeft =
				Number.parseFloat(window.getComputedStyle(container).paddingLeft) || 0;
			const _containerPaddingRight =
				Number.parseFloat(window.getComputedStyle(container).paddingRight) || 0;
			const _containerPaddingTop =
				Number.parseFloat(window.getComputedStyle(container).paddingTop) || 0;
			const _containerPaddingBottom =
				Number.parseFloat(window.getComputedStyle(container).paddingBottom) ||
				0;

			const outlineLeft = elRect.left - totalExtension;
			const outlineRight = elRect.right + totalExtension;
			const outlineTop = elRect.top - totalExtension;
			const outlineBottom = elRect.bottom + totalExtension;

			const clippedLeft = outlineLeft < containerRect.left;
			const clippedRight = outlineRight > containerRect.right;
			const clippedTop = outlineTop < containerRect.top;
			const clippedBottom = outlineBottom > containerRect.bottom;

			if (clippedLeft || clippedRight || clippedTop || clippedBottom) {
				const tag = e.tagName.toLowerCase();
				const type = e.getAttribute("type") || "";
				const name = e.getAttribute("name") || e.getAttribute("id") || "";
				const containerTag = container.tagName.toLowerCase();
				const sides = [
					clippedLeft && "left",
					clippedRight && "right",
					clippedTop && "top",
					clippedBottom && "bottom",
				].filter(Boolean);
				return `<${tag}${type ? `[${type}]` : ""}> name="${name}" focus outline (${totalExtension}px) clipped on ${sides.join(", ")} by <${containerTag}> with overflow`;
			}
			return null;
		});
		if (result) failures.push(result);
	}

	expect(failures, "Focus outlines clipped by overflow containers").toEqual([]);
});

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
layoutTests(test, path, [
	"/layout/article",
	"/layout/documentation",
	"/layout/form",
	"/layout/slices",
]);
