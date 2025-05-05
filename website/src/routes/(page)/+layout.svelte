<script>
	import PageHeader from '@components/Header.svelte';
	import PageFooter from '@components/Footer.svelte';
	let { children, ...props } = $props();
</script>

<PageHeader />
{@render children?.()}
<PageFooter />
