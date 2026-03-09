<script>
import Main from "../elements/main.svelte";

const { children, ...props } = $props();
</script>

<Main id="main" class="container-slices" {...props}>
  {@render children?.()}
</Main>
