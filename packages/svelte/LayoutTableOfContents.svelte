<script>
  import Div from "@design-system/svelte/element/div.svelte";
  import Aside from "@design-system/svelte/element/aside.svelte";
  import Main from "@design-system/svelte/element/main.svelte";

  let { hgroup, scrollspy, children, ...props } = $props();
</script>

<Main id="main" class="container-toc" {...props}>
  {#if hgroup}
    {@render hgroup({ id: "grid-top" })}
  {/if}
  {#if scrollspy}
    <Aside id="grid-toc">
      {@render scrollspy()}
    </Aside>
  {/if}
  {#if children}
    <Div id="grid-doc">
      {@render children()}
    </Div>
  {/if}
</Main>
