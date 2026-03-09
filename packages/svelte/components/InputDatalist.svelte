<script>
import Datalist from "../elements/datalist.svelte";
import FieldInput from "./FieldInput.svelte";

const { children, ...props } = $props();
const { id } = props;
</script>

<FieldInput
  autocapitalize="off"
  autocorrect="off"
  spellcheck="false"
  is="ds-datalist"
  {...props}
  list="{id}-datalist"
>
  <Datalist id="{id}-datalist">
    {@render children?.()}
  </Datalist>
</FieldInput>
