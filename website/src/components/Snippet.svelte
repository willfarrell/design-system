<script>
	import Header from '@design-system/svelte/element/header.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Footer from '@design-system/svelte/element/footer.svelte';
	import Details from '@design-system/svelte/element/details.svelte';
	import Summary from '@design-system/svelte/element/summary.svelte';
	import Codeblock from '@design-system/svelte/Codeblock.svelte';
	export let Example, Code;
	// TODO id to map to iframe
</script>

<article class="snippet">
	<!-- <Header><A href="" target="_blank">Open in new tab</A></Header> -->
	<svelte:component this={Example} />
	<Footer>
		<Details>
			<Summary>View HTML markup</Summary>
			<Codeblock language="html" code={Code ?? Example} />
		</Details>
	</Footer>
</article>

<style>
	.snippet {
		/* border: var(--border-width) solid currentColor; */
		padding: var(--padding-fixed);
	}
	:global(footer) {
		margin-block-start: var(--padding-fixed);
	}
</style>
