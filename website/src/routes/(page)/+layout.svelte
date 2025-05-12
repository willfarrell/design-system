<script>
	import PageHeader from '@components/Header.svelte';
	import PageFooter from '@components/Footer.svelte';
	const { children, ...props } = $props();
</script>

<PageHeader />
{@render children?.()}
<PageFooter />
