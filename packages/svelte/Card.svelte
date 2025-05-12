<script>
  import Div from "@design-system/svelte/element/div.svelte";
  import Li from "@design-system/svelte/element/li.svelte";
  const { ...props } = $props();
  const { id, is = "ds-card", img, children } = props;

  const slugify = (id) => {
    return id
      .toLocaleLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
  };
</script>

<!-- src: https://inclusive-components.design/cards/ -->

<Li class="card" is="ds-card">
  {#if children}
    <Div class="text">
      {@render children({ id: `card-${slugify(id)}` })}
    </Div>
  {/if}
  {#if img}
    <Div class="img">
      {@render img()}
    </Div>
  {/if}
</Li>
