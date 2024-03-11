<script>
  import Div from './element/div.svelte';
  import FieldLabel from "./FieldLabel.svelte";
  import FieldHint from "./FieldHint.svelte";
  import FieldError from "./FieldError.svelte";
  import Input from './element/input.svelte';
  export let id, label, hint, error;
</script>

<Div>
  <FieldLabel {id} {label} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <Input {...$$props}/>
  <slot />
</Div>
