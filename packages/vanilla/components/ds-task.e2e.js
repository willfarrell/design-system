import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open } from "../browser.testutil.js";

const components = [
	{ is: "ds-task", tag: "li", wrap: (html) => `<ul>${html}</ul>` },
	{ is: "ds-card", tag: "article", wrap: (html) => html },
];

for (const { is, tag, wrap } of components) {
	const setup = async () => {
		const page = await open(
			wrap(
				`<${tag} is="${is}" id="row" style="display:block;padding:2rem"><a id="link" href="#target">Link</a> <span id="text">text</span></${tag}>`,
			),
		);
		await load(page, `components/${is}.js`);
		await page.evaluate(() => {
			window.clicks = 0;
			document.getElementById("link").addEventListener("click", (event) => {
				event.preventDefault();
				window.clicks += 1;
			});
		});
		return page;
	};
	const clicks = (page) => page.evaluate(() => window.clicks);

	test(`${is}: left click on the row follows the link once`, async () => {
		const page = await setup();
		await page.click("#text");
		assert.equal(await clicks(page), 1);
	});

	test(`${is}: left click on the link follows it once`, async () => {
		const page = await setup();
		await page.click("#link");
		assert.equal(await clicks(page), 1);
	});

	test(`${is}: middle click on the row does not follow the link`, async () => {
		const page = await setup();
		await page.click("#text", { button: "middle" });
		assert.equal(await clicks(page), 0);
	});

	for (const modifier of ["Control", "Meta", "Shift", "Alt"]) {
		test(`${is}: ${modifier}+click on the row does not follow the link`, async () => {
			const page = await setup();
			await page.click("#text", { modifiers: [modifier] });
			assert.equal(await clicks(page), 0);
		});
	}

	test(`${is}: a row built before its link is added still follows it`, async () => {
		const page = await open(wrap(`<div id="host"></div>`));
		await load(page, `components/${is}.js`);
		await page.evaluate(
			({ is, tag }) => {
				window.clicks = 0;
				const row = document.createElement(tag, { is });
				row.style = "display:block;padding:2rem";
				row.innerHTML = `<a id="link" href="#target">Link</a> <span id="text">text</span>`;
				row.querySelector("a").addEventListener("click", (event) => {
					event.preventDefault();
					window.clicks += 1;
				});
				document.getElementById("host").append(row);
			},
			{ is, tag },
		);
		await page.click("#text");
		assert.deepEqual(page.errors, []);
		assert.equal(await clicks(page), 1);
	});

	test(`${is}: a row without a link ignores clicks`, async () => {
		const page = await open(
			wrap(`<${tag} is="${is}" id="row"><span id="text">text</span></${tag}>`),
		);
		await load(page, `components/${is}.js`);
		await page.click("#text");
		assert.deepEqual(page.errors, []);
	});
}
