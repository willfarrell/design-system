<script>
import Article from "@design-system/svelte/element/article.svelte";
import Aside from "@design-system/svelte/element/aside.svelte";
import Div from "@design-system/svelte/element/div.svelte";
import Main from "@design-system/svelte/element/main.svelte";

const { header, aside, children, ...props } = $props();
</script>

<Main id="main" class="container-toc" {...props}>
  <Article>
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
  </Article>
</Main>
