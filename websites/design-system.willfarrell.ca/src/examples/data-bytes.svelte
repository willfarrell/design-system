<script>
import DataBytes from "@willfarrell-ds/svelte/components/DataBytes.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
</script>

<P><DataBytes value={0} /></P>
<P><DataBytes value={1024} /></P>
<P><DataBytes value={1048576} /></P>
<P><DataBytes value={1073741824} /></P>
<P><DataBytes value={1099511627776} /></P>
