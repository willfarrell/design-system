<script>
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Ol from "@willfarrell-ds/svelte/elements/ol.svelte";
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
