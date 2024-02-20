<script>
	import Ol from '@design-system/svelte/element/ol.svelte';
	import Li from '@design-system/svelte/element/li.svelte';
</script>

<Ol>
	<Li>Item</Li>
	<Li
		>Item
		<Ol>
			<Li>Item</Li>
			<Li
				>Item
				<Ol>
					<Li>Item</Li>
					<Li>Item</Li>
					<Li>Item</Li>
				</Ol>
			</Li>
			<Li>Item</Li>
		</Ol>
	</Li>
	<Li>Item</Li>
</Ol>
