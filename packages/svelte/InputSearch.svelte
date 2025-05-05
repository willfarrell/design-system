<script>
  import InputText from './InputText.svelte';
  let { ...props } = $props();
  let {
    autocapitalize = 'off', 
    autocorrect = 'off', 
    spellcheck = 'false'
  } = props
  // type="search" not used deliberately, always wrap in <search/>
</script>

<InputText
  {...props}
  enterkeyhint="search"
/>

