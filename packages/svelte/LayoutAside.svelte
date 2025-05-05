<script>
  import Div from "@design-system/svelte/element/div.svelte";
  import Aside from "@design-system/svelte/element/aside.svelte";
  let { nav, children, ...props } = $props();
</script>

<Div class="container-aside" {...props}>
  {#if nav}
    <Aside>
      {@render nav()}
    </Aside>
  {/if}
  {@render children?.()}
</Div>

<style global>
  .container-aside nav li + li:has(strong) {
    margin-block-start: 1em;
  }
</style>
