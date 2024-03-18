<script>
  import FieldInput from './FieldInput.svelte'
  export let value
</script>

<FieldInput {...$$props} value={value ?? null} type="file" is="ds-input-file" />
