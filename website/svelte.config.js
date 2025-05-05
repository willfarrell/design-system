import { resolve } from 'node:path';
import adapter from '@sveltejs/adapter-static';
//import { markdown } from 'svelte-preprocess-markdown'
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		alias: {
			'@components': resolve('./src/components'),
			'@examples': resolve('./src/examples'),
			'@variables': resolve('./src/variables'),
			'@scripts': resolve('./src/scripts'),
			'@styles': resolve('./src/styles'),
			'@utils': resolve('./packages/svelte/utils')
		},
		appDir: 'app',
		csp: {
			mode: 'auto',
			directives: {
				// self required for svg sprites in FireFox :( (BUG https://bugzilla.mozilla.org/show_bug.cgi?id=1303364)
				'default-src': ['self'],
				'base-uri': ['none'],
				//'child-src':['none'], // fallback: default-src
				//'connect-src':['none'], // fallback: default-src
				//'font-src':['none'], // fallback: default-src
				'form-action': ['self'],
				'frame-ancestors': ['self'], // X-Frame-Options: deny
				'frame-src': ['self'], // fallback: child-src, default-src
				'img-src': ['self'], // fallback: default-src
				'manifest-src': ['self'], // fallback: default-src
				//'media-src':['none'], // fallback: default-src
				//'prefetch-src':['none'], // fallback: default-src
				//'object-src':['none'], // fallback: default-src
				sandbox: [
					'allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox allow-forms'
				],
				'script-src': ['self'], // fallback: default-src
				//'script-src-attr': ['self'], // fallback: script-src, default-src
				//'script-src-elem': ['self'], // fallback: script-src, default-src
				'style-src': ['self'], // fallback: default-src
				//'style-src-attr': ['self'], // fallback: style-src, default-src
				//'style-src-elem': ['self'], // fallback: style-src, default-src
				'upgrade-insecure-requests': true,
				'worker-src': ['self'] // fallback: child-src, script-src, default-src
				//'report-to': ['csp'], // Not supported when prerendered
				//'trusted-types': ['ds'], // Experimental
			}
		},
		csrf: {
			checkOrigin: true
		},
		paths: {
			relative: false,
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		},
		//inlineStyleThreshold: 25 * 1024,
		prerender: {
			concurrency: 5,
			crawl: true,
			entries: ['/', '/sitemap.xml'],
			handleHttpError: 'warn', // 'fail'
			handleMissingId: 'warn', // 'fail'
			handleEntryGeneratorMismatch: 'warn', // 'fail'
			origin: process.env.ORIGIN ?? 'https://datastream.org'
		},
		serviceWorker: { register: false }
	},
	compilerOptions: {
		cssHash: ({ hash, css }) => `s-${hash(css)}`
	},
	extensions: ['.svelte', '.md'],
	preprocess: [
		//markdown(),
		preprocess({
			postcss: true,
			preserve: ['ld+json']
		})
	],

	onwarn(warning, defaultHandler) {
		// warning: {code:'a11y-', message, frame, start:{line, column, character}, end:{line, column, character}, pos, filename}
		// polyfill for `is` included, allow
		if (warning.code === 'avoid-is') return;
		// `dialog > autofocus` should be allowed
		// if (warning.code === 'a11y-autofocus') return;

		warning.message = `[${warning.code}] ${warning.message}`;
		defaultHandler(warning);
	}
};

export default config;
