<script>
import Icon from "@design-system/components/Icon.svelte";
import Button from "@design-system/elements/button.svelte";
import Div from "@design-system/elements/div.svelte";
import Span from "@design-system/elements/span.svelte";
</script>

<!-- TODO mention FireFox bug -->
<Div role="group">
	<Button>verb</Button>
	<Button class="force active">verb (active)</Button>
	<Button class="force focus">verb (focus)</Button>
	<Button class="force hover">verb (hover)</Button>
	<Button><Icon src="/img/icons.svg#search" /><Span class="visually-hidden">Verb</Span></Button>
	<Button><Icon src="/img/icons.svg#search" /><Span>Verb</Span></Button>
</Div>
