import { pascalCase } from 'change-case';

export default (component) => {
	return `Example${pascalCase(component)}`;
};

// <p lang="yxx">
export const paragraph =
	'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

export const removeLoremIpsum = (str) =>
	str.replaceAll(' lang="yxx"', '').replaceAll(paragraph, '...');
