<script>
  import { setContext } from "svelte";
  import Fieldset from "./element/fieldset.svelte";
  import FieldLegend from "./FieldLegend.svelte";
  import FieldHint from "./FieldHint.svelte";
  import FieldError from "./FieldError.svelte";
  const { children, ...props } = $props();
  const {
    id,
    name = props.id,
    legend = props.label,
    legendSnippet,
    hint,
    error,
    value,
  } = props;

  setContext("fieldset", { name, value });
</script>

<Fieldset {...props}>
  <FieldLegend {id} {legend} children={legendSnippet} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  {@render children?.({ id, value })}
</Fieldset>
