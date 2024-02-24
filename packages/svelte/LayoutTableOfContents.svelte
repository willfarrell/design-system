<script>
	import Div from '@design-system/svelte/element/div.svelte';
	import Aside from '@design-system/svelte/element/aside.svelte';
	import Main from '@design-system/svelte/element/main.svelte';
</script>

<Main class="container-toc">
	<slot id="grid-top" name="hgroup"/>
	<Aside id="grid-toc">
		<slot name="scrollspy"/>
	</Aside>
	<Div id="grid-doc">
		<slot />
	</Div>
</Main>
