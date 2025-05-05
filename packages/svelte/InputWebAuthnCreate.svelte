<script>
  import InputHidden from "./InputHidden.svelte";
  let { ...props } = $props();
  let {
    is = "ds-webauthn-create",
    options
  } = props;
</script>

<InputHidden
  {...props}
  {is}
  autocomplete='webauthn'
  data-options={options}
/>

