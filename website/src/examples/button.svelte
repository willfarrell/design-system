<script>
	import Button from '@design-system/svelte/element/button.svelte';
	import Icon from '@design-system/svelte/Icon.svelte';
</script>

<div role="group">
	<Button>verb</Button>
	<Button class="outline"><span>verb</span></Button>
	<Button><Icon src="search" /><span class="visually-hidden">verb</span></Button>
	<Button class="outline"><Icon src="search" /><span>verb</span></Button>
</div>
