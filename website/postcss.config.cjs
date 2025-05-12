module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-nesting': {},
		'postcss-calc': {},
		cssnano: {},
		//'postcss-csso': {}, // doesn't support @container - https://github.com/lahmatiy/postcss-csso/issues/26
		// Bloats CSS when using color-themes
		/*'postcss-css-variables': {
			preserveAtRulesOrder: true
		},*/
		'postcss-extract-media-query': {
			output: {
				path: './static/css',
				name: '[query].[ext]'
			},
			queries: {
				print: 'print'
			},
			extractAll: false,
			config: {
				plugins: {
					// 'postcss-csso': {} // doesn't support @container - https://github.com/lahmatiy/postcss-csso/issues/26
					cssnano: {}
				}
			},
			stats: false
		}
	}
};
