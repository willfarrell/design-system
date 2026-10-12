<script>
import DataBytes from "@willfarrell-ds/svelte/components/DataBytes.svelte";
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
import Output from "@willfarrell-ds/svelte/elements/output.svelte";
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
