<script>
  import { setContext } from "svelte";
  import Fieldset from "./element/fieldset.svelte";
  import FieldLegend from "./FieldLegend.svelte";
  import FieldHint from "./FieldHint.svelte";
  import FieldError from "./FieldError.svelte";
  let { ...props } = $props();
  let {
    id, 
    name = props.id, 
    legend = props.label,
    hint, 
    error, 
    value,
    children
  } = props

  setContext("fieldset", { name, value });
</script>

<Fieldset {...props}>
  <FieldLegend {id} legend={legend} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  {@render children?.({ id, value })}
</Fieldset>
