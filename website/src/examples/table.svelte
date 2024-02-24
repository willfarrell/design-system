<script>
	import {paragraph} from '@examples/index.js'
	import Table from '@design-system/svelte/Table.svelte';
	import Caption from '@design-system/svelte/element/caption.svelte';
	import Colgroup from '@design-system/svelte/element/colgroup.svelte';
	import Col from '@design-system/svelte/element/col.svelte';
	import Thead from '@design-system/svelte/element/thead.svelte';
	import Tbody from '@design-system/svelte/element/tbody.svelte';
	import Tfoot from '@design-system/svelte/element/tfoot.svelte';
	import Tr from '@design-system/svelte/element/tr.svelte';
	import Th from '@design-system/svelte/element/th.svelte';
	import Td from '@design-system/svelte/element/td.svelte';
</script>

<Table>
	<Caption>{paragraph}</Caption>
	<Colgroup>
		<Col />
		<Col span="2" />
		<Col span="3" />
	</Colgroup>
	<Thead>
		<Tr>
			<Th scope="col">#</Th>
			<Th scope="col">Heading</Th>
			<Th scope="col">Heading</Th>
			<Th scope="col">Heading</Th>
			<Th scope="col">Heading</Th>
			<Th scope="col">Heading</Th>
		</Tr>
	</Thead>
	<Tbody>
		<Tr>
			<Th scope="row">1</Th>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
		</Tr>
		<Tr>
			<Th scope="row">1</Th>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
		</Tr>
		<Tr>
			<Th scope="row">1</Th>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
			<Td>Cell</Td>
		</Tr>
	</Tbody>
	<Tfoot>
		<Tr>
			<Th scope="col">#</Th>
			<Th scope="col">Footer</Th>
			<Th scope="col">Footer</Th>
			<Th scope="col">Footer</Th>
			<Th scope="col">Footer</Th>
			<Th scope="col">Footer</Th>
		</Tr>
	</Tfoot>
</Table>
