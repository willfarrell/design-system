<script>
  import InputText from "./InputText.svelte";
</script>

<InputText {...$$props} autocomplete="postal-code" autocapitalize='off' autocorrect='off' spellcheck='false' />
