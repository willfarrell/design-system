<script>
  import Div from './element/div.svelte';
  let { children, ...props } = $props();
</script>
<!-- div container needed to allow overflow-x on oversized tables -->
<Div class="table-overflow"><table {...props}>
  {@render children?.()}
</table></Div>
