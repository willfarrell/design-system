<script>
	import Prism from 'prismjs';
	import 'prismjs/components/prism-markup.js'; // html
	import 'prismjs/components/prism-css.js'; // css
	import 'prismjs/components/prism-javascript.js'; // js
	import 'prismjs/components/prism-bash.js'; // sh
	
	// import {format} from "prettier"; // await format(html)
	// import format from "html-format"; // supports mac char format(html, " ".repeat(2), 55)
	import format from "pretty"; // format(html, {ocd: true})
	
	import Pre from './element/pre.svelte'
	import Code from './element/code.svelte'
	
	let { ...props } = $props();
	
	let { language = 'js', code } = props

	// for rendering svelte components into html
	let componentCode
	if (typeof code === 'object') {
		const {html} = code.render();
		componentCode = format(html, {ocd: true})
	} else if (typeof code === 'string') {
		componentCode = format(code, {ocd: true})
	} else if (typeof code !== 'string') {
		componentCode = 'error'
	}
	
	Prism.manual = true;
	// https://prismjs.com/plugins/line-numbers/
	// https://prismjs.com/plugins/show-invisibles/
	// https://prismjs.com/plugins/match-braces/
	// wrap indent https://github.com/PrismJS/prism/issues/2202
	const html = Prism.highlight(componentCode ?? code, Prism.languages[language], language).replaceAll('class="token ', 'class="')
	
</script>

<Pre>
	<Code {...props}>{@html html}</Code>
</Pre>