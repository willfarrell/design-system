<script>
import PopoverHint from "@willfarrell-ds/svelte/components/PopoverHint.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
</script>

<Button popovertarget="popover-hint-demo">Toggle hint</Button>
<PopoverHint id="popover-hint-demo">
	<P>Hints close other hints but leave open auto popovers in place.</P>
</PopoverHint>
