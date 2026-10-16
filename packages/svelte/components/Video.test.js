import assert from "node:assert";
import { describe, it } from "node:test";
import { createRawSnippet } from "svelte";
import { render } from "../render.testutil.js";

const path = "./components/Video.svelte";
const tracks = [{ src: "/v.en.vtt", srclang: "en", label: "English" }];

describe("Video", () => {
	it("renders a native video with controls that does not autoplay", async () => {
		const { body } = await render(path, { src: "/v.mp4", tracks });
		const [video] = body.match(/<video[^>]*>/);
		assert.match(video, / controls/);
		assert.match(video, / src="\/v.mp4"/);
		assert.doesNotMatch(video, /autoplay/);
	});

	it("defaults preload to metadata", async () => {
		const { body } = await render(path, { src: "/v.mp4", tracks });
		assert.match(body, /<video[^>]* preload="metadata"/);
	});

	it("renders captions tracks, defaulting kind to captions", async () => {
		const { body } = await render(path, {
			src: "/v.mp4",
			tracks: [
				...tracks,
				{
					src: "/v.fr.vtt",
					srclang: "fr",
					label: "Français",
					kind: "subtitles",
					default: true,
				},
			],
		});
		const [en, fr] = body.match(/<track[^>]*>/g);
		for (const attr of [
			'src="/v.en.vtt"',
			'srclang="en"',
			'label="English"',
			'kind="captions"',
		]) {
			assert.ok(en.includes(attr), attr);
		}
		assert.doesNotMatch(en, / default/);
		for (const attr of ['kind="subtitles"', " default"]) {
			assert.ok(fr.includes(attr), attr);
		}
	});

	it("requires a captions or subtitles track", async () => {
		await assert.rejects(render(path, { src: "/v.mp4" }), /captions/);
		await assert.rejects(
			render(path, {
				src: "/v.mp4",
				tracks: [
					{ src: "/c.vtt", srclang: "en", label: "Chapters", kind: "chapters" },
				],
			}),
			/captions/,
		);
	});

	it("renders multiple sources", async () => {
		const { body } = await render(path, {
			sources: [
				{ src: "/v.webm", type: "video/webm" },
				{ src: "/v.mp4", type: "video/mp4" },
			],
			poster: "/v.jpg",
			width: "640",
			height: "360",
			tracks,
		});
		const [video] = body.match(/<video[^>]*>/);
		assert.doesNotMatch(video, / src=/);
		assert.match(video, / poster="\/v.jpg"/);
		assert.match(video, / width="640"/);
		assert.match(video, / height="360"/);
		assert.match(
			body,
			/<source[^>]* src="\/v.webm"[^>]* type="video\/webm"[^>]*>.*<source[^>]* src="\/v.mp4"/s,
		);
		assert.ok(body.indexOf("<source") < body.indexOf("<track"));
	});

	it("renders a bare video without caption or transcript", async () => {
		const { body } = await render(path, { src: "/v.mp4", tracks });
		assert.match(body, /^<video/);
		assert.doesNotMatch(body, /<figure|<details/);
	});

	it("wraps the video in a figure with a caption", async () => {
		const { body } = await render(path, {
			src: "/v.mp4",
			tracks,
			caption: "Test pattern",
		});
		assert.match(
			body,
			/^<figure><video[\s\S]*<\/video>\s*<figcaption>Test pattern<\/figcaption>\s*<\/figure>$/,
		);
	});

	it("renders the transcript in a native disclosure", async () => {
		const { body } = await render(path, {
			src: "/v.mp4",
			tracks,
			caption: "Test pattern",
			transcript: createRawSnippet(() => ({ render: () => "<p>Beep.</p>" })),
		});
		assert.match(
			body,
			/<\/video>\s*<figcaption>Test pattern<\/figcaption>\s*<details><summary>Transcript<\/summary>\s*<p>Beep.<\/p>\s*<\/details>\s*<\/figure>$/,
		);
	});

	it("labels the transcript disclosure", async () => {
		const { body } = await render(path, {
			src: "/v.mp4",
			tracks,
			labelTranscript: "Transcription",
			transcript: createRawSnippet(() => ({ render: () => "<p>Bip.</p>" })),
		});
		assert.match(body, /<figure>[\s\S]*<summary>Transcription<\/summary>/);
	});
});
