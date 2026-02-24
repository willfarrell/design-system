<script>
import InputText from "./InputText.svelte";

const { children, ...props } = $props();

// type="search" not used deliberately, always wrap in <search/>
</script>

<InputText {...props} enterkeyhint="search">
  {@render children?.()}
</InputText>
