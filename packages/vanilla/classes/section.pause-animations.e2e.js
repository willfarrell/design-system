import assert from "node:assert/strict";
import { test } from "node:test";
import { open, vanilla } from "../browser.testutil.js";

const setup = (reducedMotion = "no-preference") =>
	open(
		`<link rel="stylesheet" href="${vanilla}/all.css">
		<style>
			@keyframes spin{to{rotate:1turn}}
			.hero::before,.spinner,.spinner::after{content:"";animation:spin 20s infinite}
		</style>
		<section class="pause-animations hero" id="inside" style="display:flex;flex-direction:column;min-block-size:10rem">
			<div class="spinner" id="child"></div>
			<p id="content" style="text-align:end">Content that reaches the inline end</p>
			<div><input type="checkbox" id="pause" name="pause-animations"><label for="pause">Pause animations</label></div>
		</section>
		<section id="outside"><div class="spinner" id="sibling"></div></section>`,
		{ media: { reducedMotion } },
	);

const states = (page) =>
	page.evaluate(() => {
		const state = (id, pseudo) =>
			getComputedStyle(document.getElementById(id), pseudo).animationPlayState;
		return {
			section: state("inside", "::before"),
			child: state("child"),
			childPseudo: state("child", "::after"),
			sibling: state("sibling"),
		};
	});

const running = {
	section: "running",
	child: "running",
	childPseudo: "running",
	sibling: "running",
};

test("animations in the section run until its toggle is checked", async () => {
	const page = await setup();
	assert.deepEqual(await states(page), running);
	await page.click("#pause");
	assert.deepEqual(await states(page), {
		section: "paused",
		child: "paused",
		childPseudo: "paused",
		sibling: "running",
	});
	await page.click("#pause");
	assert.deepEqual(await states(page), running);
});

test("the toggle is a native labelled checkbox", async () => {
	const page = await setup();
	const box = page.getByRole("checkbox", { name: "Pause animations" });
	await box.focus();
	await page.keyboard.press("Space");
	assert.equal(await box.isChecked(), true);
	assert.equal((await states(page)).section, "paused");
});

test("a checkbox with another name does not pause the section", async () => {
	const page = await setup();
	await page.$eval("#pause", (el) => {
		el.name = "other";
	});
	await page.click("#pause");
	assert.deepEqual(await states(page), running);
});

test("the toggle sits at the inline and block end of the section", async () => {
	const page = await setup();
	const { section, toggle } = await page.evaluate(() => {
		const rect = (el) => el.getBoundingClientRect().toJSON();
		return {
			section: rect(document.getElementById("inside")),
			toggle: rect(document.getElementById("pause")),
		};
	});
	assert.ok(toggle.right <= section.right, JSON.stringify({ section, toggle }));
	assert.ok(toggle.bottom <= section.bottom);
	assert.ok(toggle.right > section.right - toggle.width * 2);
	assert.ok(toggle.bottom > section.bottom - toggle.height * 2);
});

test("the toggle shows pause, then play once checked", async () => {
	const page = await setup();
	const icon = () =>
		page.$eval("#pause", (el) => getComputedStyle(el, "::after").clipPath);
	const pause = await icon();
	await page.click("#pause");
	const play = await icon();
	assert.notEqual(pause, play);
	assert.match(play, /^polygon\(/);
});

test("the toggle is hidden when reduced motion is preferred", async () => {
	const page = await setup("reduce");
	assert.equal(
		await page.getByRole("checkbox", { name: "Pause animations" }).isVisible(),
		false,
	);
});

test("the toggle never overlaps the section content", async () => {
	const page = await setup();
	for (const width of [280, 320, 640, 1280]) {
		await page.setViewportSize({ width, height: 800 });
		await page.evaluate(() => {
			document.documentElement.style.fontSize = "200%";
		});
		const { content, toggle } = await page.evaluate(() => ({
			content: document.getElementById("content").getBoundingClientRect()
				.bottom,
			toggle: document.getElementById("pause").getBoundingClientRect().top,
		}));
		assert.ok(toggle >= content, `${width}px: ${toggle} < ${content}`);
	}
});

test("the toggle follows the section content in focus order", async () => {
	const page = await setup();
	const follows = await page.evaluate(
		() =>
			!!(
				document
					.getElementById("content")
					.compareDocumentPosition(document.getElementById("pause")) &
				Node.DOCUMENT_POSITION_FOLLOWING
			),
	);
	assert.equal(follows, true);
});
