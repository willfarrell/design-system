<script>
import ItemList from "@willfarrell-ds/svelte/components/ItemList.svelte";

const menu = [
	{ label: "Edit", href: "#" },
	{ label: "Duplicate", href: "#" },
	{ label: "Archive", href: "#" },
];

const items = [
	{
		id: "item-1",
		label: "Step 1",
		href: `#`,
		tag: null,
		status: "Complete",
		menu,
	},
	{
		id: "item-2",
		label: "Step 2",
		href: `#`,
		tag: "inprogress",
		status: "In progress",
		menu,
	},
	{
		id: "item-3",
		label: "Step 3",
		href: `#`,
		tag: "incomplete",
		status: "Not yet started",
		menu,
	},
];
</script>

<ItemList {items} />
