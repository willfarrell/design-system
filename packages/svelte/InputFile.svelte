<script>
  import FieldInput from './FieldInput.svelte'
  export let button, value
</script>

<FieldInput {...$$props} value={value ?? null} type="file" data-button={button} />
