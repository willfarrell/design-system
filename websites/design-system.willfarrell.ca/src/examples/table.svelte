<script>
import Table from "@willfarrell-ds/svelte/components/Table.svelte";
import Caption from "@willfarrell-ds/svelte/elements/caption.svelte";
import Col from "@willfarrell-ds/svelte/elements/col.svelte";
import Colgroup from "@willfarrell-ds/svelte/elements/colgroup.svelte";
import Tbody from "@willfarrell-ds/svelte/elements/tbody.svelte";
import Td from "@willfarrell-ds/svelte/elements/td.svelte";
import Tfoot from "@willfarrell-ds/svelte/elements/tfoot.svelte";
import Th from "@willfarrell-ds/svelte/elements/th.svelte";
import Thead from "@willfarrell-ds/svelte/elements/thead.svelte";
import Tr from "@willfarrell-ds/svelte/elements/tr.svelte";
import { paragraph } from "#examples/index.js";
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
	<!--<Tfoot>
		<Tr>
			<Th>#</Th>
			<Th>Footer</Th>
			<Th>Footer</Th>
			<Th>Footer</Th>
			<Th>Footer</Th>
			<Th>Footer</Th>
		</Tr>
	</Tfoot>-->
</Table>
