import { error } from "@sveltejs/kit";
import makeExampleComponent from "#examples/index.js";
import components from "#examples/registry.js";

export const load = ({ params }) => {
	const { component } = params;
	if (!Object.hasOwn(components, makeExampleComponent(component))) {
		error(404, "Not Found");
	}
	return {
		component,
	};
};

export const actions = {
	default: () => ({}),
};
