<script>
import Button from "../elements/button.svelte";
import Div from "../elements/div.svelte";
import Span from "../elements/span.svelte";

const { children, labelLoading = "Loading...", ...props } = $props();
</script>

<Div class="group">
  <Button type="submit" {...props}>
    {@render children?.()}
  </Button>
  <Div data-loader="false">
    <Span class="visually-hidden">{labelLoading}</Span>
  </Div>
</Div>
