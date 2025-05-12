<script>
  import FieldInput from "./FieldInput.svelte";
  const { children, ...props } = $props();
</script>

<FieldInput
  autocapitalize="off"
  autocomplete="off"
  autocorrect="off"
  spellcheck="false"
  {...props}
  type="text"
>
  {@render children?.()}
</FieldInput>
