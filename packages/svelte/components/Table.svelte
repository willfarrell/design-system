<script>
import Div from "../elements/div.svelte";

const { children, ...props } = $props();
</script>

<!-- div container needed to allow overflow-x on oversized tables -->
<Div class="table-overflow" role="region" aria-label={props['aria-label'] ?? 'Data table'} tabindex="0">
  <table {...props}>
    {@render children?.()}
  </table>
</Div>
