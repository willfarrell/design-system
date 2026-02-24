<script>
import A from "@design-system/svelte/element/a.svelte";
import Div from "@design-system/svelte/element/div.svelte";
import Span from "@design-system/svelte/element/span.svelte";
import Icon from "@design-system/svelte/Icon.svelte";
import { page } from "$app/state";
</script>

<Div role="group">
	<A href="#" class="button">verb</A>
	<A href="#" class="button force active">verb (active)</A>
	<A href="#" class="button force focus">verb (focus)</A>
	<A href="#" class="button force hover">verb (hover)</A>
	<A href="#" class="button"
		><Icon src="/img/icons.svg#search" /><Span class="visually-hidden">Verb</Span></A
	>
	<A href="#" class="button"><Icon src="/img/icons.svg#search" /><Span>Verb</Span></A>
</Div>
