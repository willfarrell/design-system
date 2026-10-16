import assert from "node:assert";
import { describe, it } from "node:test";
import { render } from "../render.testutil.js";

const path = "./components/Pagination.svelte";

describe("Pagination", () => {
	it("links previous and next with rel on a middle page", async () => {
		const { body } = await render(path, {
			current: 5,
			total: 10,
			href: "?page={n}",
		});
		assert.match(body, /<nav class="pagination" aria-label="Pagination"><ul>/);
		assert.match(body, /<a href="\?page=4" rel="prev">Previous<\/a>/);
		assert.match(body, /<a href="\?page=6" rel="next">Next<\/a>/);
	});

	it("omits previous on the first page", async () => {
		const { body } = await render(path, {
			current: 1,
			total: 3,
			href: "?page={n}",
		});
		assert.doesNotMatch(body, /rel="prev"|Previous/);
		assert.match(body, /<a href="\?page=2" rel="next">Next<\/a>/);
	});

	it("omits next on the last page", async () => {
		const { body } = await render(path, {
			current: 3,
			total: 3,
			href: "?page={n}",
		});
		assert.doesNotMatch(body, /rel="next"|Next/);
		assert.match(body, /<a href="\?page=2" rel="prev">Previous<\/a>/);
	});

	it("marks the current page and links the others", async () => {
		const { body } = await render(path, {
			current: 2,
			total: 3,
			href: (n) => `/page/${n}`,
		});
		assert.match(
			body,
			/<a href="\/page\/1"><span class="visually-hidden">Page <\/span>1<\/a>/,
		);
		assert.match(
			body,
			/<a href="\/page\/2" aria-current="page"><span class="visually-hidden">Page <\/span>2<\/a>/,
		);
		assert.match(
			body,
			/<a href="\/page\/3"><span class="visually-hidden">Page <\/span>3<\/a>/,
		);
	});

	it("collapses long ranges to first, last and current ±1", async () => {
		const { body } = await render(path, {
			current: 5,
			total: 10,
			href: "?page={n}",
		});
		const pages = [
			...body.matchAll(
				/<li>(?:<a [^>]*><span[^>]*>Page <\/span>(\d+)<\/a>|(…))<\/li>/g,
			),
		].map(([, n, gap]) => n ?? gap);
		assert.deepStrictEqual(pages, ["1", "…", "4", "5", "6", "…", "10"]);
	});
});
