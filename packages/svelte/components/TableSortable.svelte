<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-table-sortable.js?worker&url";
import Table from "./Table.svelte";

const { children, ...props } = $props();
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>
<Table is="ds-table-sortable" {...props}>
  {@render children?.()}
</Table>
