import assert from "node:assert/strict";
import { test } from "node:test";
import { load, open, vanilla } from "../test-browser.js";

const row = (attrs) => `
	<ul><li ${attrs}>
		<a href="#x">Label</a>
		<strong class="inprogress"><span>Status</span></strong>
		<small>Note</small>
	</li></ul>`;

const styles = (page, selector) =>
	page.$eval(selector, (li) => {
		const pick = (el, props) => {
			const style = getComputedStyle(el);
			return Object.fromEntries(props.map((prop) => [prop, style[prop]]));
		};
		return {
			ul: pick(li.parentElement, ["listStyleType", "paddingInlineStart"]),
			li: pick(li, [
				"display",
				"flexWrap",
				"justifyContent",
				"borderTopWidth",
				"borderBottomWidth",
			]),
			a: pick(li.querySelector("a"), ["paddingTop", "whiteSpace"]),
			strong: pick(li.querySelector("strong"), [
				"fontWeight",
				"paddingLeft",
				"backgroundColor",
			]),
			small: pick(li.querySelector("small"), ["flexBasis", "marginTop"]),
		};
	});

for (const [name, sheet] of [
	["all.css", "all.css"],
	["their own files", null],
]) {
	test(`ds-item and ds-task rows share their layout (${name})`, async () => {
		const links = sheet
			? `<link rel="stylesheet" href="${vanilla}/${sheet}">`
			: `<link rel="stylesheet" href="${vanilla}/theme.css"><link rel="stylesheet" href="${vanilla}/components/ds-item.css"><link rel="stylesheet" href="${vanilla}/components/ds-task.css">`;
		const page = await open(
			`${links}${row('class="ds-item" id="item"')}${row('is="ds-task" id="task"')}`,
		);
		const item = await styles(page, "#item");
		assert.equal(item.li.display, "flex");
		assert.equal(item.ul.listStyleType, "none");
		assert.notEqual(item.strong.backgroundColor, "rgba(0, 0, 0, 0)");
		assert.deepEqual(await styles(page, "#task"), item);
	});
}

test("ds-task.css alone styles a task row", async () => {
	const page = await open(
		`<link rel="stylesheet" href="${vanilla}/theme.css"><link rel="stylesheet" href="${vanilla}/components/ds-task.css">${row('is="ds-task" id="task"')}`,
	);
	const task = await styles(page, "#task");
	assert.equal(task.li.display, "flex");
	assert.equal(task.a.whiteSpace, "nowrap");
});

test("hovering a ds-task row styles its link like a hovered link", async () => {
	const page = await open(
		`<link rel="stylesheet" href="${vanilla}/all.css">${row('is="ds-task" id="task"')}<p><a id="plain" href="#y">Plain</a></p>`,
	);
	await load(page, "components/ds-task.js");
	const linkStyle = (selector) =>
		page.$eval(selector, (a) => {
			const style = getComputedStyle(a);
			return {
				color: style.color,
				decorationColor: style.textDecorationColor,
				decorationLine: style.textDecorationLine,
				thickness: style.textDecorationThickness,
			};
		});
	await page.hover("#plain");
	const plain = await linkStyle("#plain");
	await page.hover("#task small");
	assert.deepEqual(await linkStyle("#task a"), plain);
});
