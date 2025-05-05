<script>
	import PageHeader from '@components/Header.svelte';
	import LayoutAside from '@design-system/svelte/LayoutAside.svelte';
	import NavDocumentation from '@components/NavDocumentation.svelte';
	import PageFooter from '@components/Footer.svelte';
	let { children, ...props } = $props();
</script>

<PageHeader />
<LayoutAside>
	{#snippet nav()}
		<NavDocumentation />
	{/snippet}
	{@render children?.()}
</LayoutAside>
<PageFooter />
