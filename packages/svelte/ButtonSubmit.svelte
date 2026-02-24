<script>
import Button from "@design-system/svelte/element/button.svelte";
import Div from "@design-system/svelte/element/div.svelte";
import Span from "@design-system/svelte/element/span.svelte";
import allowedAttributes from "./utils/attributes.js";

const { children, ...props } = $props();

const elementAttributes = new Set([
	"autofocus",
	"command",
	"commandfor",
	"disabled",
	"form",
	"formaction",
	"formenctype",
	"formmethod",
	"formnovalidate",
	"formtarget",
	"name",
	"popovertarget",
	"popovertargetaction",
	"type",
	"value",
]);
</script>

<Div role="group">
  <Button type="submit" {...props}>
    {@render children?.()}
  </Button>
  <Div data-loader="false">
    <Span class="visually-hidden">Loading...</Span><!-- TODO i18n -->
  </Div>
</Div>
