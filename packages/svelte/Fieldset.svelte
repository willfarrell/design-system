<script>
  import { setContext } from "svelte";
  import Fieldset from "./element/fieldset.svelte";
  import FieldLegend from "./FieldLegend.svelte";
  import FieldHint from "./FieldHint.svelte";
  import FieldError from "./FieldError.svelte";
  export let id, name, legend, label, hint, error, value;

  setContext("fieldset", { name: name ?? id, value });
</script>

<Fieldset {...$$props}>
  <FieldLegend {id} legend={legend ?? label} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <slot {id} {value} />
</Fieldset>
