<script>
import Article from "../elements/article.svelte";
import Aside from "../elements/aside.svelte";
import Div from "../elements/div.svelte";
import Main from "../elements/main.svelte";

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
