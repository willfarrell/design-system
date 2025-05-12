<script>
  import Div from "./element/div.svelte";
  import FieldLabel from "./FieldLabel.svelte";
  import FieldHint from "./FieldHint.svelte";
  import FieldError from "./FieldError.svelte";
  import Input from "./element/input.svelte";
  const { children, ...props } = $props();
  const { id, label, labelSnippet, hint, error } = props;
</script>

<Div>
  <FieldLabel {id} {label} children={labelSnippet} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <Input {...props} />
  {@render children?.()}
</Div>
