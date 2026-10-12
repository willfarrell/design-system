<script>
import Button from "../elements/button.svelte";
import Div from "../elements/div.svelte";
import Popover from "./Popover.svelte";

const { children, button, id, label, ...props } = $props();
</script>

<Div>
  <Button popovertarget={id} {...props}>
    {#if button}{@render button()}{:else}{label}{/if}
  </Button>
  <Popover {id} class="ds-dropdown">
    {@render children?.()}
  </Popover>
</Div>
