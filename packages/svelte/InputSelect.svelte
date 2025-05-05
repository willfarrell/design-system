<script>
  import Div from './element/div.svelte';
  import FieldLabel from "./FieldLabel.svelte";
  import FieldHint from "./FieldHint.svelte";
  import FieldError from "./FieldError.svelte";
  import Select from "./element/select.svelte";
  let { children, ...props } = $props();
  let { 
    id, 
    label, 
    hint, 
    error
  } = props
</script>

<Div>
  <FieldLabel {id} {label} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
    <Div>
      <Select {...props}>
        {@render children?.()}
      </Select>
    </Div>
</Div>
