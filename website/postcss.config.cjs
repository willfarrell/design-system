module.exports = {
	plugins: {
		'postcss-import': {},
		'postcss-nesting': {},
		'postcss-calc': {},
		'postcss-csso': {},
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
					'postcss-csso': {}
				}
			},
			stats: false
		}
	}
};
