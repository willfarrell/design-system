<script>
import { createRawSnippet } from "svelte";
import Label from "../elements/label.svelte";

const defaultSnippet = createRawSnippet((label) => ({
	render: () => label(),
}));

const { children = defaultSnippet, id, label, ...props } = $props();
</script>

{#if label}
  <Label for={id} {...props}>
    {@render children(label.toString())}
  </Label>
{/if}
