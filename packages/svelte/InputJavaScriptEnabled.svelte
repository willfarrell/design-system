<script>
  import Fieldset from "./Fieldset.svelte";
  import InputHidden from "./InputHidden.svelte";
  let { ...props } = $props()
  let { id } = props
  let {
    is = 'input-' + id,
    name = id,
    label, 
    hint,
    value = false,
    error
  } = props
  
  error = error?.filter((v) => v.id === id);
</script>

{#if error?.length}
  <Fieldset
    {id}
    {is}
    {label}
    {hint}
    {error}
  >
    <InputHidden {name} {value} />
  </Fieldset>
{:else}
  <Fieldset {id} {is}>
    <InputHidden {name} {value} />
  </Fieldset>
{/if}
