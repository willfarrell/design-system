<script>
  import { getContext } from "svelte";
  import FieldsetInput from "./FieldsetInput.svelte";
  const { ...props } = $props();
  const { hint, value, checked } = props;
  const { name, value: fieldsetValue } = getContext("fieldset");
  const id = `${name}-${value}`;
</script>

<FieldsetInput
  {...props}
  {id}
  {name}
  type="radio"
  {value}
  checked={checked === true || fieldsetValue === value}
  aria-describedby={hint || null}
>
  <!--{#if children}
    <Div>
      {@render children?.()}
    </Div>
  {/if}-->
</FieldsetInput>
