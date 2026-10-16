<script>
import LayoutAside from "@willfarrell-ds/svelte/components/LayoutAside.svelte";
import BodyFooter from "#components/BodyFooter.svelte";
import BodyHeader from "#components/BodyHeader.svelte";
import NavDocumentation from "#components/NavDocumentation.svelte";

const { children, ...props } = $props();
</script>

<BodyHeader />
<LayoutAside>
	{#snippet aside()}
		<NavDocumentation />
	{/snippet}
	{@render children?.()}
</LayoutAside>
<BodyFooter />
