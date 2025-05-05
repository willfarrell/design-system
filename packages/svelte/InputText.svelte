<script>
  import FieldInput from './FieldInput.svelte';
  let { ...props } = $props();
  let { 
    autocomplete = 'off',
    autocapitalize = 'off',
    autocorrect = 'off', 
    spellcheck = 'false',
  } = props
</script>

<FieldInput
  {...props}
  type="text"
  {autocomplete}
  {autocapitalize}
  {autocorrect}
  {spellcheck}
/>
