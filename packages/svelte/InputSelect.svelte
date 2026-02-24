<script>
import Div from "./element/div.svelte";
import Select from "./element/select.svelte";
import FieldError from "./FieldError.svelte";
import FieldHint from "./FieldHint.svelte";
import FieldLabel from "./FieldLabel.svelte";

const { children, ...props } = $props();
const { id, label, labelSnippet, hint, error } = props;
</script>

<Div>
  <FieldLabel {id} {label} children={labelSnippet} />
  <FieldHint {id} {hint} />
  <FieldError {id} {error} />
  <Div>
    <Select {...props}>
      {@render children?.()}
    </Select>
  </Div>
</Div>
