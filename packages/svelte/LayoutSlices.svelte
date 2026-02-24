<script>
import Main from "@design-system/svelte/element/main.svelte";

const { children, ...props } = $props();
</script>

<Main id="main" class="container-slices" {...props}>
  {@render children?.()}
</Main>
