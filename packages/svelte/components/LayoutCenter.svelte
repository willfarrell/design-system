<script>
import Main from "../elements/main.svelte";

const { children, suffix, ...props } = $props();
</script>

<Main id="main" class="container" {...props}>
  {@render children?.()}
  {@render suffix?.()}
</Main>
