<script>
import Li from "@design-system/elements/li.svelte";
import Ol from "@design-system/elements/ol.svelte";
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
