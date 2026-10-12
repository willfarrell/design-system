<script>
import Icon from "@willfarrell-ds/svelte/components/Icon.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Div from "@willfarrell-ds/svelte/elements/div.svelte";
import Span from "@willfarrell-ds/svelte/elements/span.svelte";
import { page } from "$app/state";
</script>

<Div class="group">
	<A href="#" class="button">verb</A>
	<A href="#" class="button force active">verb (active)</A>
	<A href="#" class="button force focus">verb (focus)</A>
	<A href="#" class="button force hover">verb (hover)</A>
	<A href="#" class="button"
		><Icon src="/img/icons.svg#search" /><Span class="visually-hidden">Verb</Span></A
	>
	<A href="#" class="button"><Icon src="/img/icons.svg#search" /><Span>Verb</Span></A>
</Div>
