/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
	semi: true,
	singleQuote: true,
	trailingComma: 'es5',
	jsxSingleQuote: true,
	printWidth: 80,
	plugins: ['prettier-plugin-organize-imports'],
};

export default config;
