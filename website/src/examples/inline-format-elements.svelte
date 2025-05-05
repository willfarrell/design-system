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

	import Time from '@design-system/svelte/Time.svelte';
	import DataNumber from '@design-system/svelte/DataNumber.svelte';
	import DataBytes from '@design-system/svelte/DataBytes.svelte';
	import DataEnum from '@design-system/svelte/DataEnum.svelte';

	const enums = {
		'metadata-value': 'Metadata label'
	};
</script>

<Div style="column-width:20ch">
	<P><Time datetime="2025-05-01" /></P>
	<P><DataNumber value="1000.99" /></P>
	<P><DataBytes value="1048576" /></P>
	<P><DataEnum value="metadata-value" {enums} /></P>
</Div>
