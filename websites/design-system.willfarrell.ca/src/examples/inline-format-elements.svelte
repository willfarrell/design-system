<script>
import DataBytes from "@willfarrell-ds/svelte/components/DataBytes.svelte";
import DataEnum from "@willfarrell-ds/svelte/components/DataEnum.svelte";
import DataNumber from "@willfarrell-ds/svelte/components/DataNumber.svelte";
import DataTime from "@willfarrell-ds/svelte/components/DataTime.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Abbr from "@willfarrell-ds/svelte/elements/abbr.svelte";
import B from "@willfarrell-ds/svelte/elements/b.svelte";
import Bdo from "@willfarrell-ds/svelte/elements/bdo.svelte";
import Cite from "@willfarrell-ds/svelte/elements/cite.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Del from "@willfarrell-ds/svelte/elements/del.svelte";
import Dfn from "@willfarrell-ds/svelte/elements/dfn.svelte";
import Div from "@willfarrell-ds/svelte/elements/div.svelte";
import Em from "@willfarrell-ds/svelte/elements/em.svelte";
import I from "@willfarrell-ds/svelte/elements/i.svelte";
import Ins from "@willfarrell-ds/svelte/elements/ins.svelte";
import Kbd from "@willfarrell-ds/svelte/elements/kbd.svelte";
import Mark from "@willfarrell-ds/svelte/elements/mark.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Q from "@willfarrell-ds/svelte/elements/q.svelte";
import S from "@willfarrell-ds/svelte/elements/s.svelte";
import Small from "@willfarrell-ds/svelte/elements/small.svelte";
import Span from "@willfarrell-ds/svelte/elements/span.svelte";
import Strong from "@willfarrell-ds/svelte/elements/strong.svelte";
import Sub from "@willfarrell-ds/svelte/elements/sub.svelte";
import Sup from "@willfarrell-ds/svelte/elements/sup.svelte";
import U from "@willfarrell-ds/svelte/elements/u.svelte";
import Var from "@willfarrell-ds/svelte/elements/var.svelte";

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
