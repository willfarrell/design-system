<script>
	import { mount } from 'svelte';
	import { render } from 'svelte/server';

	import Example from '@components/Example.svelte';

	import Header from '@design-system/svelte/element/header.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Iframe from '@design-system/svelte/element/iframe.svelte';
	import Footer from '@design-system/svelte/element/footer.svelte';
	import Details from '@design-system/svelte/element/details.svelte';
	import Summary from '@design-system/svelte/element/summary.svelte';
	import Codeblock from '@design-system/svelte/Codeblock.svelte';
	import Div from '@design-system/svelte/element/div.svelte';

	let { example } = $props();

	const { html } = render(Example, { props: { component: example } });
</script>

<Div class="snippet">
	<Header><A href="/demo/{example}" target="_blank">Open in new tab</A></Header>
	<!-- <Example component={example} /> -->
	<Iframe title={example} src="/demo/{example}" />
	<Footer>
		<Details>
			<Summary>View HTML markup</Summary>
			<Codeblock language="html" code={html} />
		</Details>
	</Footer>
</Div>

<style global>
	.snippet {
		/* border: var(--border-width) solid currentColor; */
		padding: var(--padding-fixed) 0;

		footer {
			margin-block-start: var(--padding-fixed);
		}

		iframe {
			border: var(--border-width) solid var(--border-color, currentColor);
			width: 100%;
			height: 15em;
			max-inline-size: 60ch;
			resize: both;
			overflow: auto;
		}
	}
</style>
