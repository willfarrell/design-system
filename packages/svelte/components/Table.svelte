<script>
import Div from "../elements/div.svelte";
import Table from "../elements/table.svelte";

const { children, "aria-label": label = "Data table", ...props } = $props();
</script>

<!-- div container needed to allow overflow-x on oversized tables -->
<!-- biome-ignore lint/a11y/useSemanticElements: <section> inherits `.container-slices > section` layout -->
<!-- biome-ignore lint/a11y/noNoninteractiveTabindex: WCAG 2.1.1, a scrollable region must be keyboard focusable -->
<Div class="table-overflow" role="region" aria-label={label} tabindex="0">
  <Table {...props}>
    {@render children?.()}
  </Table>
</Div>
