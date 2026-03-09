<script>
import DataBytes from "@design-system/components/DataBytes.svelte";
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
import Output from "@design-system/elements/output.svelte";
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
</script>

<Div style="column-width:20ch">
	<P><Abbr title="abbreviation">abbr</Abbr></P>
	<P><Bdo dir="rtl">reverse</Bdo></P>
	<P><Dfn id="dfn"><Abbr title="definition">dfn</Abbr></Dfn></P>
	<P><Strong>bold</Strong> <B>bold</B></P>
	<P><Em>italic</Em> <Cite>italic</Cite> <I>italic</I></P>
	<P><Del>deleted</Del></P>
	<P><Ins>inserted</Ins></P>
	<P><Code>var meaning = 42;</Code></P>
	<P><Kbd>Ctrl</Kbd> + <Kbd>K</Kbd></P>
	<P><Mark>highlighted</Mark></P>
	<P
		><math>
			<mfrac>
				<mn>1</mn>
				<msqrt>
					<mn>2</mn>
				</msqrt>
			</mfrac>
		</math></P
	>
	<P><Output>output</Output></P>
	<P
		><Span lang="en"><Q>english quote</Q></Span>
		<Span lang="fr"><Q>french quote</Q></Span>
		<Span lang="de"><Q>german quote</Q></Span></P
	>
	<P><S>strikethrough</S></P>
	<P><Small>small</Small></P>
	<P>X<Sub>sub</Sub></P>
	<P>X<Sup>sup</Sup></P>
	<P><U>underline</U></P>
	<P><Var>variable</Var></P>
</Div>
