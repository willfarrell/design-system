import assert from "node:assert";
import { afterEach, describe, it } from "node:test";
import { page, render } from "../render.testutil.js";

afterEach(() => {
	delete page.data;
});

describe("DataBytes", () => {
	const path = "./components/DataBytes.svelte";
	it("keeps decimals", async () => {
		const { body } = await render(path, { value: 1536 });
		assert.match(body, />1.5 KB</);
	});
	it("handles values below one byte", async () => {
		const { body } = await render(path, { value: 0.5 });
		assert.match(body, />0.5 Bytes</);
	});
	it("formats with the locale from page data", async () => {
		page.data = { locale: "de-DE" };
		const { body } = await render(path, { value: 1536 });
		assert.match(body, />1,5 KB</);
	});
});

describe("DataNumber", () => {
	const path = "./components/DataNumber.svelte";
	it("formats with the locale from page data", async () => {
		page.data = { locale: "de-DE" };
		const { body } = await render(path, { value: 1234.5 });
		assert.match(body, />1\.234,5</);
	});
});

describe("DataTime", () => {
	const path = "./components/DataTime.svelte";
	it("formats date-only values on the given day", async () => {
		const { body } = await render(path, { datetime: "2024-01-02" });
		assert.match(body, />January 2, 2024</);
	});
	it("formats with the locale from page data", async () => {
		page.data = { locale: "de-DE" };
		const { body } = await render(path, { datetime: "2024-01-02" });
		assert.match(body, />2. Januar 2024</);
	});
	it("accepts Intl component options", async () => {
		const { body } = await render(path, {
			datetime: "2024-01-02",
			month: "long",
		});
		assert.match(body, />January</);
	});
});

describe("Callout", () => {
	const path = "./components/Callout.svelte";
	it("renders a stable id without an id prop", async () => {
		const a = await render(path, { label: "Note" });
		const b = await render(path, { label: "Note" });
		assert.strictEqual(a.body, b.body);
	});
});

describe("Footnotes", () => {
	it("uses labelId for the heading and link", async () => {
		const notes = await render("./components/Footnotes.svelte", {
			title: "Notes",
			labelId: "notes-a",
		});
		assert.match(notes.body, /<h2[^>]* id="notes-a"/);
		const link = await render("./components/FootnoteLink.svelte", {
			id: "1",
			labelId: "notes-a",
			class: "ref",
		});
		assert.match(link.body, /aria-describedby="notes-a"/);
		assert.match(link.body, /class="ref"/);
	});
});
