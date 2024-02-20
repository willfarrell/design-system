<script>
  import InputSelect from './InputSelect.svelte'

  export let textNoResults = 'No results.'
</script>

<InputSelect {...$$props} is="ds-select-autocomplete" data-i18n-no-results={textNoResults}><slot /></InputSelect>
