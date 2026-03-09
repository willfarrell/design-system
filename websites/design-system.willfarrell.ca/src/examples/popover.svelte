<script>
import Popover from "@design-system/components/Popover.svelte";
import Button from "@design-system/elements/button.svelte";
import P from "@design-system/elements/p.svelte";
</script>

<Button popovertarget="popover-demo">Toggle popover</Button>
<Popover id="popover-demo">
	<P>This is popover content that appears on demand.</P>
</Popover>
