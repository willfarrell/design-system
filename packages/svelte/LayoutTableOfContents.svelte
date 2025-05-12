<script>
  import Main from "@design-system/svelte/element/main.svelte";
  import Div from "@design-system/svelte/element/div.svelte";
  import Aside from "@design-system/svelte/element/aside.svelte";

  const { header, aside, children, ...props } = $props();
</script>

<Main id="main" class="container-toc" {...props}>
  <Div>
    {#if header}
      <Div>
        {@render header()}
      </Div>
    {/if}
    {#if aside}
      <Aside>
        {@render aside()}
      </Aside>
    {/if}
    {#if children}
      <Div>
        {@render children()}
      </Div>
    {/if}
  </Div>
</Main>
