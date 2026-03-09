<script>
import Li from "@design-system/elements/li.svelte";
import Ul from "@design-system/elements/ul.svelte";
</script>

<Ul>
	<Li>Item</Li>
	<Li
		>Item
		<Ul>
			<Li>Item</Li>
			<Li
				>Item
				<Ul>
					<Li>Item</Li>
					<Li>Item</Li>
					<Li>Item</Li>
				</Ul>
			</Li>
			<Li>Item</Li>
		</Ul>
	</Li>
	<Li>Item</Li>
</Ul>
