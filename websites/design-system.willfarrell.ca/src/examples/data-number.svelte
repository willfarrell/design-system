<script>
import DataNumber from "@willfarrell-ds/svelte/components/DataNumber.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
</script>

<P><DataNumber value={1234.56} /></P>
<P><DataNumber value={1000000} /></P>
<P><DataNumber value={0.125} style="percent" /></P>
<P><DataNumber value={99.99} style="currency" currency="USD" /></P>
