<script>
  import { getContext } from "svelte";
  import FieldsetInput from './FieldsetInput.svelte';
  export let hint, value, checked;
  const { name, value: fieldsetValue } = getContext("fieldset");
  const id = name + "-" + value;
</script>

  <FieldsetInput
    {...$$props}
    {id}
    {name}
    type="checkbox"
    {value}
    checked={checked === true || fieldsetValue?.includes(value)}
    aria-describedby={hint || null}
  >

  <!--{#if $$slots.default}
    <Div>
      <slot />
    </Div>
  {/if}-->
</FieldsetInput>
