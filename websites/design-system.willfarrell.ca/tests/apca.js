export const luminance = ([r, g, b]) =>
	0.2126729 * (r / 255) ** 2.4 +
	0.7151522 * (g / 255) ** 2.4 +
	0.072175 * (b / 255) ** 2.4;

// biome-ignore lint/suspicious/noApproximativeNumericConstant: APCA-W3 blkClmp is exactly 1.414
const softClamp = (y) => (y > 0.022 ? y : y + (0.022 - y) ** 1.414);

export const apcaContrast = (text, background) => {
	const txtY = softClamp(luminance(text));
	const bgY = softClamp(luminance(background));
	if (Math.abs(bgY - txtY) < 0.0005) return 0;
	if (bgY > txtY) {
		const sapc = (bgY ** 0.56 - txtY ** 0.57) * 1.14;
		return sapc < 0.1 ? 0 : (sapc - 0.027) * 100;
	}
	const sapc = (bgY ** 0.65 - txtY ** 0.62) * 1.14;
	return sapc > -0.1 ? 0 : (sapc + 0.027) * 100;
};

export const bronzeMinimum = (fontSize, fontWeight) => {
	if (fontSize >= 36 || (fontSize >= 24 && fontWeight >= 700)) return 45;
	if (fontSize >= 24 || (fontSize >= 16 && fontWeight >= 700)) return 60;
	if (fontSize >= 18 || (fontSize >= 14 && fontWeight >= 700)) return 75;
	return 90;
};

const renderedPairs = () => {
	const canvas = document.createElement("canvas");
	canvas.width = 1;
	canvas.height = 1;
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	const paint = (colors) => {
		ctx.globalCompositeOperation = "copy";
		ctx.fillStyle = "#fff";
		ctx.fillRect(0, 0, 1, 1);
		ctx.globalCompositeOperation = "source-over";
		for (const color of colors) {
			ctx.fillStyle = color;
			ctx.fillRect(0, 0, 1, 1);
		}
		return [...ctx.getImageData(0, 0, 1, 1).data.slice(0, 3)];
	};
	const opaque = (color) => {
		ctx.clearRect(0, 0, 1, 1);
		ctx.fillStyle = color;
		ctx.fillRect(0, 0, 1, 1);
		return ctx.getImageData(0, 0, 1, 1).data[3] === 255;
	};
	const backgrounds = (el) => {
		const layers = [];
		for (let node = el; node; node = node.parentElement) {
			const { backgroundColor } = getComputedStyle(node);
			layers.unshift(backgroundColor);
			if (opaque(backgroundColor)) break;
		}
		return layers;
	};
	const pairs = [];
	const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
	for (let node = walker.nextNode(); node; node = walker.nextNode()) {
		const el = node.parentElement;
		if (!node.textContent.trim() || !el.checkVisibility()) continue;
		if (el.closest(".visually-hidden, [aria-hidden='true']")) continue;
		const box = el.getBoundingClientRect();
		if (box.width < 2 || box.height < 2) continue;
		const style = getComputedStyle(el);
		const layers = backgrounds(el);
		const classes = [];
		for (let e = el; e; e = e.parentElement) classes.push(...e.classList);
		pairs.push({
			text: node.textContent.trim().slice(0, 30),
			tag: el.tagName.toLowerCase(),
			classes,
			selector: [el.parentElement?.parentElement, el.parentElement, el]
				.filter(Boolean)
				.map(
					(e) =>
						`${e.tagName.toLowerCase()}${e.classList.length ? `.${[...e.classList].join(".")}` : ""}`,
				)
				.join(" > "),
			fontSize: Number.parseFloat(style.fontSize),
			fontWeight: Number.parseInt(style.fontWeight, 10),
			foreground: paint([...layers, style.color]),
			background: paint(layers),
		});
	}
	return pairs;
};

export const apcaBronzeFailures = async (page) => {
	const pairs = await page.evaluate(renderedPairs);
	const failures = [];
	for (const pair of pairs) {
		const lc = Math.abs(apcaContrast(pair.foreground, pair.background));
		const minimum = bronzeMinimum(pair.fontSize, pair.fontWeight);
		if (lc < minimum) failures.push({ ...pair, lc, minimum });
	}
	return { pairs: pairs.length, failures };
};
