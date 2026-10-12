<script>
import TaskListSortable from "@willfarrell-ds/svelte/components/TaskListSortable.svelte";

const tasks = [
	{
		id: "task-alpha",
		label: "alpha.example.com",
		href: "#",
		tag: null,
		status: "Complete",
		sort: { name: "alpha.example.com", updated: "1767225600000" },
	},
	{
		id: "task-charlie",
		label: "charlie.example.com",
		href: "#",
		tag: "inprogress",
		status: "In progress",
		sort: { name: "charlie.example.com", updated: "1772323200000" },
	},
	{
		id: "task-bravo",
		label: "bravo.example.com",
		href: "#",
		tag: "incomplete",
		status: "Not yet started",
		sort: { name: "bravo.example.com", updated: "1769904000000" },
	},
];

const sorts = [
	{ value: "name", label: "Name (A to Z)" },
	{ value: "-name", label: "Name (Z to A)" },
	{ value: "-updated", label: "Recently updated" },
];
</script>

<TaskListSortable {tasks} {sorts} addHref="#" addLabel="Add domain" />
