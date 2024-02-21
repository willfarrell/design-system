<script>
  import InputText from './InputText.svelte';
  
  export let autocapitalize = 'off', autocorrect = 'off', spellcheck = 'false'
  // type="search" not used deliberately, always wrap in <search/>
</script>

<InputText
  {...$$props}
  enterkeyhint="search"
  {autocapitalize}
  {autocorrect}
  {spellcheck}
/>

