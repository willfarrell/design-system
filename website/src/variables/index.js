import { pascalCase } from 'change-case';

export default (component) => {
	return `Variable${pascalCase(component)}`;
};
