<script>
import Aside from "@design-system/svelte/element/aside.svelte";
import Div from "@design-system/svelte/element/div.svelte";

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
