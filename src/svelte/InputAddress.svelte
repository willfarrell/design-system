<script>
  import FieldText from "./FieldText.svelte";
  
  export let autocapitalize = 'off', autocorrect = 'off', spellcheck = 'false'
  export let autocomplete = 'address-line1' // address-line2, address-line3, address-level4, postal-code
</script>

<FieldText {...$$props} {autocomplete} {autocapitalize} {autocorrect} {spellcheck} />
