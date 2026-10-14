<script>
import Caption from "../elements/caption.svelte";
import Div from "../elements/div.svelte";
import Table from "../elements/table.svelte";

const {
	children,
	caption,
	"aria-label": label,
	"aria-labelledby": labelledby,
	...props
} = $props();
const uid = $props.id();
const captionId = `caption-${uid}`;
const name = $derived(
	label
		? { "aria-label": label }
		: labelledby
			? { "aria-labelledby": labelledby }
			: caption
				? { "aria-labelledby": captionId }
				: { "aria-label": "Data table" },
);
</script>

<!-- div container needed to allow overflow-x on oversized tables -->
<!-- biome-ignore lint/a11y/useSemanticElements: <section> inherits `.container-slices > section` layout -->
<!-- biome-ignore lint/a11y/noNoninteractiveTabindex: WCAG 2.1.1, a scrollable region must be keyboard focusable -->
<Div class="table-overflow" role="region" {...name} tabindex="0">
  <Table {...props}>
    {#if caption}
      <Caption id={captionId}>{caption}</Caption>
    {/if}
    {@render children?.()}
  </Table>
</Div>
