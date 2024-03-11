<script>
	import Div from '@design-system/svelte/element/div.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Abbr from '@design-system/svelte/element/abbr.svelte';
	import B from '@design-system/svelte/element/b.svelte';
	import Strong from '@design-system/svelte/element/strong.svelte';
	import Bdo from '@design-system/svelte/element/bdo.svelte';
	import Dfn from '@design-system/svelte/element/dfn.svelte';
	import Em from '@design-system/svelte/element/em.svelte';
	import Cite from '@design-system/svelte/element/cite.svelte';
	import I from '@design-system/svelte/element/i.svelte';
	import Del from '@design-system/svelte/element/del.svelte';
	import Ins from '@design-system/svelte/element/ins.svelte';
	import Code from '@design-system/svelte/element/code.svelte';
	import Kbd from '@design-system/svelte/element/kbd.svelte';
	import Mark from '@design-system/svelte/element/mark.svelte';
	import Q from '@design-system/svelte/element/q.svelte';
	import S from '@design-system/svelte/element/s.svelte';
	import Small from '@design-system/svelte/element/small.svelte';
	import Span from '@design-system/svelte/element/span.svelte';
	import Sub from '@design-system/svelte/element/sub.svelte';
	import Sup from '@design-system/svelte/element/sup.svelte';
	import U from '@design-system/svelte/element/u.svelte';
	import Var from '@design-system/svelte/element/var.svelte';
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
	<P><Kbd>Ctrl + K</Kbd></P>
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
	<P
		><Span lang="en"><Q>english quote</Q></Span>
		<Span lang="fr"><Q>french quote</Q></Span>
		<Span lang="de"><Q>german quote</Q></Span></P
	>
	<P><S>strikthrough</S></P>
	<P><Small>small</Small></P>
	<P><Sub>sub</Sub></P>
	<P><Sup>sup</Sup></P>
	<P><U>underline</U></P>
	<P><Var>variable</Var></P>
</Div>
