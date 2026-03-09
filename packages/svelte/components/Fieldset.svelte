<script>
import { setContext } from "svelte";
import Fieldset from "../elements/fieldset.svelte";
import FieldError from "./FieldError.svelte";
import FieldHint from "./FieldHint.svelte";
import FieldLegend from "./FieldLegend.svelte";

const { children, id, name, legend, legendSnippet, hint, error, value, ...props } = $props();
const resolvedName = $derived(name ?? id);
const resolvedLegend = $derived(legend ?? props.label);
setContext("fieldset", { get name() { return resolvedName; }, get value() { return value; } });
</script>

<Fieldset name={resolvedName} {...props}>
  <FieldLegend {id} legend={resolvedLegend} children={legendSnippet} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  {@render children?.()}
</Fieldset>
