<script>
	import Table from '@design-system/svelte/Table.svelte';
	import Caption from '@design-system/svelte/element/caption.svelte';
	import Colgroup from '@design-system/svelte/element/colgroup.svelte';
	import Th from '@design-system/svelte/element/th.svelte';
	import Td from '@design-system/svelte/element/td.svelte';

	const caption =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
</script>

<Table class="stripe">
	<Caption>{caption}</Caption>
	<Colgroup>
		<col />
		<col span="2" />
		<col span="3" />
	</Colgroup>
	<thead>
		<tr>
			<Th scope="col">#</Th>
			<Th scope="col">Heading</Th>
			<Th scope="col">Heading</Th>
			<Th scope="col">Heading</Th>
			<Th scope="col">Heading</Th>
			<Th scope="col">Heading</Th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<Th scope="row">1</Th>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
		</tr>
		<tr>
			<Th scope="row">1</Th>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
		</tr>
		<tr>
			<Th scope="row">1</Th>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
		</tr>
	</tbody>
	<tfoot>
		<tr>
			<Th scope="col">#</Th>
			<Th scope="col">Footer</Th>
			<Th scope="col">Footer</Th>
			<Th scope="col">Footer</Th>
			<Th scope="col">Footer</Th>
			<Th scope="col">Footer</Th>
		</tr>
	</tfoot>
</Table>
