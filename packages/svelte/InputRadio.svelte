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
    type="radio"
    {value}
    checked={checked === true || fieldsetValue === value}
    aria-describedby={hint || null}
  >

  <!--{#if $$slots.default}
    <Div>
      <slot />
    </Div>
  {/if}-->
</FieldsetInput>
