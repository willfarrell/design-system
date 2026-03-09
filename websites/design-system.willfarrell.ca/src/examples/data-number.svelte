<script>
import DataNumber from "@design-system/components/DataNumber.svelte";
import P from "@design-system/elements/p.svelte";
</script>

<P><DataNumber value={1234.56} /></P>
<P><DataNumber value={1000000} /></P>
<P><DataNumber value={0.125} style="percent" /></P>
<P><DataNumber value={99.99} style="currency" currency="USD" /></P>
