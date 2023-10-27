<script>
  import Fieldset from "./Fieldset.svelte";
  import InputHidden from "./InputHidden.svelte";

  export let id, label, hint, error;
  id ??= "javascript-enabled";
  error = error?.filter((v) => v.id === id);
</script>

{#if error?.length}
  <Fieldset
    {id}
    is="input-{id}"
    {label}
    {hint}
    {error}
  >
    <InputHidden name={id} value="false" />
  </Fieldset>
{:else}
  <Fieldset {id} is="input-{id}">
    <InputHidden name={id} value="false" />
  </Fieldset>
{/if}
