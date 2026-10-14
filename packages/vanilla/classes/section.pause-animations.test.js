import assert from "node:assert/strict";
import { test } from "node:test";
import { open, vanilla } from "../browser.testutil.js";

const setup = () =>
	open(
		`<link rel="stylesheet" href="${vanilla}/all.css">
		<style>
			@keyframes spin{to{rotate:1turn}}
			.hero::before,.spinner,.spinner::after{content:"";animation:spin 20s infinite}
		</style>
		<section class="pause-animations hero" id="inside">
			<div><input type="checkbox" id="pause" name="pause-animations"><label for="pause">Pause animations</label></div>
			<div class="spinner" id="child"></div>
		</section>
		<section id="outside"><div class="spinner" id="sibling"></div></section>`,
		{ media: { reducedMotion: "no-preference" } },
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
	await page.click("label");
	assert.deepEqual(await states(page), {
		section: "paused",
		child: "paused",
		childPseudo: "paused",
		sibling: "running",
	});
	await page.click("label");
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
	await page.click("label");
	assert.deepEqual(await states(page), running);
});
