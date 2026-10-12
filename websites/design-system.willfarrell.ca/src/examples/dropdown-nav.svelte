<script>
import Dropdown from "@willfarrell-ds/svelte/components/Dropdown.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Nav from "@willfarrell-ds/svelte/elements/nav.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
</script>

<Nav aria-label="Primary">
	<Dropdown id="dropdown-nav" label="Products" class="chevron">
		<Ul>
			<Li><A href="#">Analytics</A></Li>
			<Li><A href="#">Automation</A></Li>
			<Li><A href="#">Reports</A></Li>
		</Ul>
	</Dropdown>
</Nav>
