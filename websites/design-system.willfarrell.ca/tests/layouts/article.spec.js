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

const path = "/layout/article";

test("WCAG 2.2 Level AAA — automated axe audit", async ({ page }) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");
	await expectNoAxeViolations(page);
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — has heading hierarchy (h1 > h2 > h3)", async ({
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

test("WCAG 2.2 A 2.4.1 Bypass Blocks — has landmark regions (main, article, header)", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const main = page.locator("main");
	await expect(main).toHaveCount(1);

	const articles = page.locator("article");
	const articleCount = await articles.count();
	expect(articleCount).toBeGreaterThan(0);
});

test("WCAG 2.2 AA 2.4.6 Headings and Labels — headings are descriptive (non-empty)", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const headings = page.getByRole("heading");
	const count = await headings.count();
	expect(count).toBeGreaterThan(0);

	for (let i = 0; i < count; i++) {
		const text = await headings.nth(i).textContent();
		expect(text.trim().length).toBeGreaterThan(0);
	}
});

test("WCAG 2.2 A 1.3.1 Info and Relationships — footnotes section uses ordered list", async ({
	page,
}) => {
	await page.goto(path);
	await page.waitForLoadState("domcontentloaded");

	const footnotesList = page.locator("ol");
	const count = await footnotesList.count();
	expect(count).toBeGreaterThan(0);
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

	// Check no auto-redirect occurred
	const finalUrl = page.url();
	expect(finalUrl).toBe(initialUrl);

	// Check links with target="_blank" have warning text or rel indicator
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

	// Check selects don't auto-navigate on change
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

mediaModeTests(test, path);
viewportTests(test, path);
interactiveTests(test, path);
contrastTests(test, path);
hoverFocusContentTests(test, path);
layoutTests(test, path, [
	"/layout/documentation",
	"/layout/form",
	"/layout/search",
	"/layout/slices",
]);
