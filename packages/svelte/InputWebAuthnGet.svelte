<script>
  import InputHidden from "./InputHidden.svelte";
  const { ...props } = $props();
  const { options } = props;
</script>

<InputHidden
  is="ds-webauthn-get"
  {...props}
  autocomplete="webauthn"
  data-options={options}
/>
