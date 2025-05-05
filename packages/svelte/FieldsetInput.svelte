<script>
  import Div from './element/div.svelte';
  import FieldLabel from "./FieldLabel.svelte";
  import FieldHint from "./FieldHint.svelte";
  import FieldError from "./FieldError.svelte";
  import Input from './element/input.svelte';
  let { ...props } = $props();
  let {
    id, 
    label, 
    hint, 
    error
  } = props
</script>

<Div>
  <Input {...props} />
  <FieldLabel {id} {label} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <!-- conditional -->
  <!-- {@render children?.()} -->
</Div>
