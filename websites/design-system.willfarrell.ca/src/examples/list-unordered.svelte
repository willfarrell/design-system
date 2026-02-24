<script>
import Li from "@design-system/svelte/element/li.svelte";
import Ul from "@design-system/svelte/element/ul.svelte";
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
