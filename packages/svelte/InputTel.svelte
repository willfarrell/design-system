<script>
  import FieldInput from './FieldInput.svelte';
  let { ...props } = $props();
  let {
    autocomplete = 'tel'
  } = props
</script>

<FieldInput
  {...props}
  type="tel"
  {autocomplete} />
