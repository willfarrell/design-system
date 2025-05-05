<script>
  import FieldText from "./FieldText.svelte";
  let { ...props } = $props();
  let { 
    autocomplete = 'address-line2', // address-line2, address-line3, address-level4
  } = props
</script>

<FieldText
  {...props}
  {autocomplete}
/>
