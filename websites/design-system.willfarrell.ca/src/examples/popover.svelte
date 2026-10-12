<script>
import Popover from "@willfarrell-ds/svelte/components/Popover.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
</script>

<Button popovertarget="popover-demo">Toggle popover</Button>
<Popover id="popover-demo">
	<P>This is popover content that appears on demand.</P>
</Popover>
