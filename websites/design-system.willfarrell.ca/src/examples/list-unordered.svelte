<script>
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
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
