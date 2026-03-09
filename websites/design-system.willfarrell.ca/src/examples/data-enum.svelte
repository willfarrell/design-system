<script>
import DataEnum from "@design-system/components/DataEnum.svelte";
import P from "@design-system/elements/p.svelte";

const statusEnums = {
	active: "Active",
	inactive: "Inactive",
	pending: "Pending review",
	archived: "Archived",
};
</script>

<P><DataEnum value="active" enums={statusEnums} /></P>
<P><DataEnum value="inactive" enums={statusEnums} /></P>
<P><DataEnum value="pending" enums={statusEnums} /></P>
<P><DataEnum value="archived" enums={statusEnums} /></P>
