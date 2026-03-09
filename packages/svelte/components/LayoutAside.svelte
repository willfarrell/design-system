<script>
import Aside from "../elements/aside.svelte";
import Div from "../elements/div.svelte";

const { aside, children, ...props } = $props();
</script>

<Div class="container-aside" {...props}>
  {#if aside}
    <Aside>
      {@render aside()}
    </Aside>
  {/if}
  {@render children?.()}
</Div>
