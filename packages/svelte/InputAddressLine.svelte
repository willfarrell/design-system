<script>
  import FieldText from "./FieldText.svelte";
  const { children, ...props } = $props();
  const {
    autocomplete = "address-line2", // address-line2, address-line3, address-level4
  } = props;
</script>

<FieldText {...props} {autocomplete}>
  {@render children?.()}
</FieldText>
