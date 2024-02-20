<script>
  import InputHidden from "./InputHidden.svelte";

  export let is = "webauthn-create", options;
</script>

<InputHidden {...$$props} {is} data-options={options} />

