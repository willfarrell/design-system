import { resolve } from 'node:path'
import adapter from '@sveltejs/adapter-static'
import { markdown } from 'svelte-preprocess-markdown'
import preprocess from 'svelte-preprocess'
import preprocessPEWC from '@design-system/svelte-preprocess-pewc'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter(),
    alias: {
      '@components': resolve('./src/components'),
      '@examples': resolve('./src/examples')
    },
    appDir: 'app',
    csp: {
      mode: 'auto'
    },
    csrf: {
      checkOrigin: true
    },
    paths: {
      relative: false
    },
    prerender: {
      concurrency: 5,
      crawl: true,
      entries: ['/'],
      handleHttpError: 'warn', // 'fail'
      handleMissingId: 'warn', // 'fail'
      handleEntryGeneratorMismatch: 'warn', // 'fail'
      origin: process.env.ORIGIN ?? 'https://datastream.org'
    },
  },
  compilerOptions: {
    cssHash: ({ hash, css }) => `s-${hash(css)}`
  },
  extensions: ['.svelte', '.md'],
  preprocess: [
    markdown(),
    preprocessPEWC({
      css:{path:'src/styles/app.css'}
    }),
    preprocess({
      postcss: true,
      preserve: ['ld+json']
    })
  ],
  
  onwarn (warning, defaultHandler) {
    // warning: {code:'a11y-', message, frame, start:{line, column, character}, end:{line, column, character}, pos, filename}
    // polyfill for `is` included, allow
    if (warning.code === 'avoid-is') return
    // `dialog > autofocus` should be allowed
    // if (warning.code === 'a11y-autofocus') return;

    warning.message = `[${warning.code}] ${warning.message}`
    defaultHandler(warning)
  }
}

export default config
