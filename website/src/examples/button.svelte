<script>
	import Div from '@design-system/svelte/element/div.svelte';
	import Button from '@design-system/svelte/element/button.svelte';
	import Icon from '@design-system/svelte/Icon.svelte';

	import Span from '@design-system/svelte/element/span.svelte';
</script>

<!-- TODO mention FireFox bug -->
<Div role="group">
	<Button>verb</Button>
	<Button class="force active">verb (active)</Button>
	<Button class="force focus">verb (focus)</Button>
	<Button class="force hover">verb (hover)</Button>
	<Button><Icon src="/img/icons.svg#search" /><Span class="visually-hidden">verb</Span></Button>
	<Button><Icon src="/img/icons.svg#search" /><Span>verb</Span></Button>
</Div>
