<script>
  import { createRawSnippet } from "svelte";
  import Label from "./element/label.svelte";

  const defaultSnippet = createRawSnippet((label) => ({
    render: () => label(),
  }));

  const { children = defaultSnippet, ...props } = $props();

  const { id, label } = props;
</script>

{#if label}
  <Label for={id} {...props}>
    {@render children(label)}
  </Label>
{/if}
