<script>
  import InputSelect from "./InputSelect.svelte";
</script>

<InputSelect {...$$props} autocomplete="country" autocapitalize='off' autocorrect='off' spellcheck='false' >
  <slot />
</InputSelect>
