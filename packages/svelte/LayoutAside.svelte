<script>
	import Div from '@design-system/svelte/element/div.svelte';
	import Aside from '@design-system/svelte/element/aside.svelte';
</script>


<Div class="container-aside">
	<Aside>
		<slot name="nav"/>
	</Aside>
	<slot />
</Div>
