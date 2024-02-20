<script>
  import InputNumber from "./InputNumber.svelte";
  
  export let autocomplete = 'one-time-code'
</script>

<InputNumber {...$$props} {autocomplete} pattern="[0-9]*" />
