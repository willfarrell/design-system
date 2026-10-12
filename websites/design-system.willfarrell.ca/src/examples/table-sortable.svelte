<script>
import TableSortable from "@willfarrell-ds/svelte/components/TableSortable.svelte";
import Caption from "@willfarrell-ds/svelte/elements/caption.svelte";
import Data from "@willfarrell-ds/svelte/elements/data.svelte";
import Tbody from "@willfarrell-ds/svelte/elements/tbody.svelte";
import Td from "@willfarrell-ds/svelte/elements/td.svelte";
import Tfoot from "@willfarrell-ds/svelte/elements/tfoot.svelte";
import Th from "@willfarrell-ds/svelte/elements/th.svelte";
import Thead from "@willfarrell-ds/svelte/elements/thead.svelte";
import Tr from "@willfarrell-ds/svelte/elements/tr.svelte";
</script>

<TableSortable>
	<Caption>Sortable table</Caption>
	<Thead>
		<Tr>
			<Th scope="col">Name</Th>
			<Th scope="col">Quantity</Th>
			<Th scope="col">Price</Th>
			<Th scope="col">Views</Th>
		</Tr>
	</Thead>
	<Tbody>
		<Tr>
			<Th scope="row">Banana</Th>
			<Td>10</Td>
			<Td>1.50</Td>
			<Td><Data value="1234">1,234</Data></Td>
		</Tr>
		<Tr>
			<Th scope="row">Apple</Th>
			<Td>2</Td>
			<Td>3.25</Td>
			<Td><Data value="999">999</Data></Td>
		</Tr>
		<Tr>
			<Th scope="row">Cherry</Th>
			<Td>100</Td>
			<Td>0.10</Td>
			<Td><Data value="20000">20,000</Data></Td>
		</Tr>
	</Tbody>
	<Tfoot>
		<Tr>
			<Th scope="row">Total</Th>
			<Td>112</Td>
			<Td>24.75</Td>
			<Td><Data value="22233">22,233</Data></Td>
		</Tr>
	</Tfoot>
</TableSortable>
