<script>
	import Div from '@design-system/svelte/element/div.svelte';
	import Button from '@design-system/svelte/element/button.svelte';
	import Icon from '@design-system/svelte/Icon.svelte';
	
	import Span from '@design-system/svelte/element/span.svelte';
</script>

<Div role="group">
	<Button>verb</Button>
	<Button class="outline"><Span>verb</Span></Button>
	<Button><Icon src="search" /><Span class="visually-hidden">verb</Span></Button>
	<Button class="outline"><Icon src="search" /><Span>verb</Span></Button>
</Div>
