<script>
  import FieldText from "./FieldText.svelte";
  
  export let autocapitalize = 'off', autocorrect = 'off', spellcheck = 'false'
  export let autocomplete = ' street-address' // street-address, address-line2, address-line3, address-level4, city, country, postal-code
</script>

<FieldText {...$$props} {autocomplete} autocapitalize='off' autocorrect='off' spellcheck='false'  />
