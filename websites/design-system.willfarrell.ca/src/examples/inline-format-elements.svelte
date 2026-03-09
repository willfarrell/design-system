<script>
import DataBytes from "@design-system/components/DataBytes.svelte";
import DataEnum from "@design-system/components/DataEnum.svelte";
import DataNumber from "@design-system/components/DataNumber.svelte";
import DataTime from "@design-system/components/DataTime.svelte";
import A from "@design-system/elements/a.svelte";
import Abbr from "@design-system/elements/abbr.svelte";
import B from "@design-system/elements/b.svelte";
import Bdo from "@design-system/elements/bdo.svelte";
import Cite from "@design-system/elements/cite.svelte";
import Code from "@design-system/elements/code.svelte";
import Del from "@design-system/elements/del.svelte";
import Dfn from "@design-system/elements/dfn.svelte";
import Div from "@design-system/elements/div.svelte";
import Em from "@design-system/elements/em.svelte";
import I from "@design-system/elements/i.svelte";
import Ins from "@design-system/elements/ins.svelte";
import Kbd from "@design-system/elements/kbd.svelte";
import Mark from "@design-system/elements/mark.svelte";
import P from "@design-system/elements/p.svelte";
import Q from "@design-system/elements/q.svelte";
import S from "@design-system/elements/s.svelte";
import Small from "@design-system/elements/small.svelte";
import Span from "@design-system/elements/span.svelte";
import Strong from "@design-system/elements/strong.svelte";
import Sub from "@design-system/elements/sub.svelte";
import Sup from "@design-system/elements/sup.svelte";
import U from "@design-system/elements/u.svelte";
import Var from "@design-system/elements/var.svelte";

const enums = {
	"metadata-value": "Metadata label",
};
</script>

<Div style="column-width:20ch">
	<P><DataTime datetime="2025-05-01" /></P>
	<P><DataNumber value="1000.99" /></P>
	<P><DataBytes value="1048576" /></P>
	<P><DataEnum value="metadata-value" {enums} /></P>
</Div>
