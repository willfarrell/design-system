<script>
  import InputHidden from "./InputHidden.svelte";
  const { ...props } = $props();
  const { options } = props;
</script>

<InputHidden
  is="ds-webauthn-create"
  {...props}
  autocomplete="webauthn"
  data-options={options}
/>
