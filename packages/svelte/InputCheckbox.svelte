<script>
  import { getContext } from "svelte";
  import FieldsetInput from './FieldsetInput.svelte';
  let { ...props } = $props();
  let { 
    hint, 
    value, 
    checked,
  } = props
  const { name, value: fieldsetValue } = getContext("fieldset");
  const id = name + "-" + value;
</script>

  <FieldsetInput
    {...props}
    {id}
    {name}
    type="checkbox"
    {value}
    checked={checked === true || fieldsetValue?.includes(value)}
    aria-describedby={hint || null}
  >

  <!--{#if children}
    <Div>
      {@render children()}
    </Div>
  {/if}-->
</FieldsetInput>
