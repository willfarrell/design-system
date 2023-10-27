<script>
  import InputText from './InputText.svelte';
  
  export let autocapitalize = 'off', autocorrect = 'off', spellcheck = 'false'
</script>

<InputText
  {...$$props}
  enterkeyhint="search"
  {autocapitalize}
  {autocorrect}
  {spellcheck}
/>

