<script>
import BodyFooter from "@components/BodyFooter.svelte";
import BodyHeader from "@components/BodyHeader.svelte";
import NavDocumentation from "@components/NavDocumentation.svelte";
import LayoutAside from "@design-system/components/LayoutAside.svelte";

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
