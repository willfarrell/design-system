<script>
  import InputText from "./InputText.svelte";
  let { ...props } = $props();
</script>

<InputText 
  {...props}
  autocomplete='street-address'
/>

