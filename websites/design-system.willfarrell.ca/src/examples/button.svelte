<script>
import Icon from "@willfarrell-ds/svelte/components/Icon.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Div from "@willfarrell-ds/svelte/elements/div.svelte";
import Span from "@willfarrell-ds/svelte/elements/span.svelte";
</script>

<!-- TODO mention FireFox bug -->
<Div class="group">
	<Button>verb</Button>
	<Button class="force active">verb (active)</Button>
	<Button class="force focus">verb (focus)</Button>
	<Button class="force hover">verb (hover)</Button>
	<Button><Icon src="/img/icons.svg#search" /><Span class="visually-hidden">Verb</Span></Button>
	<Button><Icon src="/img/icons.svg#search" /><Span>Verb</Span></Button>
</Div>
