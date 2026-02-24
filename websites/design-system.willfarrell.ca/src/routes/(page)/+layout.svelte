<script>
import BodyFooter from "@components/BodyFooter.svelte";
import BodyHeader from "@components/BodyHeader.svelte";
import BodyMain from "@components/BodyMain.svelte";

const { children, ...props } = $props();
</script>

<BodyHeader />
{@render children?.()}
<BodyFooter />
