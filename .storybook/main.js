const config = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx|svelte)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
    '@storybook/addon-storysource',
    '@storybook/addon-svelte-csf',
    // TODO
    // storybook-addon-validate-html or storybook-addon-html-validator
    '@storybook/addon-viewport',
    '@storybook/addon-mdx-gfm',
    'storybook-addon-dir'
  ],
  framework: {
    name: '@storybook/sveltekit',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  staticDirs: [{ from: '../src/stories/assets', to: '/' }]
}
export default config
