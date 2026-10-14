import assert from "node:assert/strict";
import { test } from "node:test";
import { open, vanilla } from "../browser.testutil.js";

const setup = () =>
	open(
		`<link rel="stylesheet" href="${vanilla}/all.css">
		<style>@keyframes spin{to{rotate:1turn}} .hero,.hero::before{animation:spin 20s infinite} .hero::before{content:""}</style>
		<div><input type="checkbox" id="pause" class="pause-animations"><label for="pause">Pause animations</label></div>
		<div class="hero"></div>`,
		{ media: { reducedMotion: "no-preference" } },
	);

const states = (page) =>
	page.$eval(".hero", (el) => [
		getComputedStyle(el).animationPlayState,
		getComputedStyle(el, "::before").animationPlayState,
	]);

test("animations run until the pause checkbox is checked", async () => {
	const page = await setup();
	assert.deepEqual(await states(page), ["running", "running"]);
	await page.click("label");
	assert.deepEqual(await states(page), ["paused", "paused"]);
	await page.click("label");
	assert.deepEqual(await states(page), ["running", "running"]);
});

test("the pause checkbox is a native, labelled checkbox", async () => {
	const page = await setup();
	const box = page.getByRole("checkbox", { name: "Pause animations" });
	await box.focus();
	await page.keyboard.press("Space");
	assert.equal(await box.isChecked(), true);
	assert.deepEqual(await states(page), ["paused", "paused"]);
});
