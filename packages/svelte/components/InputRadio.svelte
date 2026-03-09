<script>
import { getContext } from "svelte";
import FieldsetInput from "./FieldsetInput.svelte";

const { hint, value, checked, ...props } = $props();
const fieldsetContext = getContext("fieldset");
const id = $derived(`${fieldsetContext.name}-${value}`);
const name = $derived(fieldsetContext.name);
const fieldsetValue = $derived(fieldsetContext.value);
</script>

<FieldsetInput
  {...props}
  {id}
  {name}
  type="radio"
  {value}
  checked={checked === true || fieldsetValue === value}
  aria-describedby={hint ? `${id}-hint` : null}
>
  <!--{#if children}
    <Div>
      {@render children?.()}
    </Div>
  {/if}-->
</FieldsetInput>
