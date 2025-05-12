<script>
  import FieldInput from "./FieldInput.svelte";
  const { children, ...props } = $props();
</script>

<FieldInput
  autocapitalize="off"
  autocorrect="off"
  spellcheck="false"
  {...props}
  type="url"
>
  {@render children?.()}
</FieldInput>
