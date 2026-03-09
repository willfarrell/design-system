<script>
import TaskList from "@design-system/components/TaskList.svelte";

const tasks = [
	{
		label: "Step 1",
		href: `#`,
		tag: null,
		status: "Complete",
	},
	{
		label: "Step 2",
		href: `#`,
		tag: "inprogress",
		status: "In progress",
	},
	{
		label: "Step 3",
		href: `#`,
		tag: "incomplete",
		status: "Not yet started",
	},
];
</script>

<TaskList {tasks} />
