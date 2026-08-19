<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-table-sortable.js?worker&url";
import Div from "../elements/div.svelte";

const { children, ...props } = $props();
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>
<!-- div container needed to allow overflow-x on oversized tables -->
<Div class="table-overflow" role="region" aria-label={props['aria-label'] ?? 'Data table'} tabindex="0">
  <table is="ds-table-sortable" {...props}>
    {@render children?.()}
  </table>
</Div>
