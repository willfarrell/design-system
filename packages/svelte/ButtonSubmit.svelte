<script>
  import Button from "@design-system/svelte/element/button.svelte";
  import Div from "@design-system/svelte/element/div.svelte";
  import Span from "@design-system/svelte/element/span.svelte";
  let { type = "submit", children, ...props } = $props();
</script>

<Button {type} {...props} }>
  {@render children?.()}
</Button>

<Div data-loader="false">
  <Span class="visually-hidden">Loading</Span>
</Div>
