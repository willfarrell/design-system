<script>
import Table from "@design-system/components/Table.svelte";
import Caption from "@design-system/elements/caption.svelte";
import Col from "@design-system/elements/col.svelte";
import Colgroup from "@design-system/elements/colgroup.svelte";
import Tbody from "@design-system/elements/tbody.svelte";
import Td from "@design-system/elements/td.svelte";
import Tfoot from "@design-system/elements/tfoot.svelte";
import Th from "@design-system/elements/th.svelte";
import Thead from "@design-system/elements/thead.svelte";
import Tr from "@design-system/elements/tr.svelte";
import { paragraph } from "@examples/index.js";
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
