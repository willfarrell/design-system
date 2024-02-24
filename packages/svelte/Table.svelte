<script>
  import Div from './element/div.svelte';
</script>
<!-- div container needed to allow overflow-x on oversized tables -->
<Div class="table-overflow"><table {...$$props}>
  <slot />
</table></Div>
