import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'

export default {
  parameters: {
    viewport: {
      viewports: INITIAL_VIEWPORTS
    }
  }
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
