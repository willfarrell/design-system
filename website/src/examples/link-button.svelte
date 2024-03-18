<script>
	import { page } from '$app/stores';
	import Div from '@design-system/svelte/element/div.svelte';
	import Span from '@design-system/svelte/element/span.svelte';
	import Icon from '@design-system/svelte/Icon.svelte';
	import A from '@design-system/svelte/element/a.svelte';
</script>

<Div role="group">
	<A href="#" class="button">verb</A>
	<A href="#" class="button force active">verb (active)</A>
	<A href="#" class="button force focus">verb (focus)</A>
	<A href="#" class="button force hover">verb (hover)</A>
	<A href="#" class="button"
		><Icon src="/img/icons.svg#search" /><Span class="visually-hidden">verb</Span></A
	>
	<A href="#" class="button"><Icon src="/img/icons.svg#search" /><Span>verb</Span></A>
</Div>
