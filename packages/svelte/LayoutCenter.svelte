<script>
  import Main from "@design-system/svelte/element/main.svelte";
  import Article from "@design-system/svelte/element/article.svelte";
  let { children, suffix, ...props } = $props();
</script>

<Main id="main" class="container" {...props}>
  {@render children?.()}
  {@render suffix?.()}
</Main>
