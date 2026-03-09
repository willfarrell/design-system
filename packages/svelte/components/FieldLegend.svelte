<script>
import { createRawSnippet } from "svelte";
import Legend from "../elements/legend.svelte";

const defaultSnippet = createRawSnippet((legend) => ({
	render: () => legend(),
}));

const { children = defaultSnippet, legend, ...props } = $props();
</script>

{#if legend}
  <Legend {...props}>
    {@render children(legend)}
  </Legend>
{/if}
