<script>
import { createRawSnippet } from "svelte";
import Legend from "./element/legend.svelte";

const defaultSnippet = createRawSnippet((legend) => ({
	render: () => legend(),
}));

const { children = defaultSnippet, ...props } = $props();

const { legend } = props;
</script>

{#if legend}
  <Legend {...props}>
    {@render children(legend)}
  </Legend>
{/if}
