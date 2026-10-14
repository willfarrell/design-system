/* eslint-env browser */

export const controlValue = (el) => {
	if (el.dataset.value !== undefined) return el.dataset.value;
	const selector = el.dataset.elem;
	if (!selector) return "";
	const target =
		el.parentElement?.querySelector(selector) ??
		document.querySelector(selector);
	return target?.value ?? target?.textContent?.trim() ?? "";
};
