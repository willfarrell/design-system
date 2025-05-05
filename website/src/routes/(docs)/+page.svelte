<script>
	import Head from '@components/Head.svelte';

	import LayoutCenter from '@design-system/svelte/LayoutCenter.svelte';
	import Article from '@design-system/svelte/element/article.svelte';

	import Hgroup from '@design-system/svelte/element/hgroup.svelte';
	import H1 from '@design-system/svelte/Heading1.svelte';
	import HSub from '@design-system/svelte/HeadingSub.svelte';

	import Section from '@design-system/svelte/element/section.svelte';
	import H2 from '@design-system/svelte/Heading2.svelte';
	import H3 from '@design-system/svelte/Heading3.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Ul from '@design-system/svelte/element/ul.svelte';
	import Li from '@design-system/svelte/element/li.svelte';

	import Codeblock from '@design-system/svelte/Codeblock.svelte';
</script>

<Head>
	<title>Design System</title>
	<meta name="description" content="A sematic fluid design system" />
</Head>

<LayoutCenter>
	<Article>
		<Hgroup>
			<H1>design system</H1>
			<HSub>Sematic fluid design</HSub>
		</Hgroup>
		<P>TL;DR Private, Accisible, Sustanable, Secure</P>
		<Section>
			<H2>Features</H2>
			<Ul>
				<Li>Sematic HTML</Li>
				<Li>classless first</Li>
				<Li>Start with as little as 0.5 KB, up to 5 KB</Li>
				<Li>Framework agnostic</Li>
				<Li>Built to meet WCAG 2.2 AAA, WCAG 3 for colors</Li>
				<Li>Right to left support</Li>
				<Li>Light and dark mode with all the prefers @media queries</Li>
				<Li>Progressive enhancement though lazy loaded customElements</Li>
			</Ul>
		</Section>
		<Section>
			<H2>Values</H2>
			<H3>Privacy</H3>
			<P
				>- Only collect what you need, when you need it - Encrypt in transit / Encrypt in use /
				Encrypt at rest - EFF DNT</P
			>
			<H3>Accessibility</H3>
			<P
				>- WCAG 2.2 AAA / WCAG 3 - rtl lang support (link) - vertical lang support (link) - date
				formatting</P
			>
			<P>- number formatting</P>
			<H3>Sustainability</H3>
			<P>- WSG Draft - Only ship what you need, when you need it</P>
			<H3>Security</H3>
			<P>- OSAWP Best practice - ASVS L3 - CSP - TrustedTypes</P>
		</Section>
		<Section>
			<H2>Gettings started</H2>
			<H3>Install</H3>
			<Codeblock language="sh" code={'npm i @design-system/style'} />

			<H3>Import</H3>
			<Codeblock language="css" code={'import @design-system/style/all.css'} />

			<H3>Add into your HTML</H3>
		</Section>
		<Section>
			<H2>CSS rules</H2>
			<Ul>
				<Li
					>Use `start` and `end` of `top`, `right`, `bottom`, `left`
					(https://rtlstyling.com/posts/rtl-styling/#logical-properties-cheat-sheet)</Li
				>
				<Li>don't use `opacity`, will be removed with `prefers-reduced-transparency`</Li>
				<Li
					>don't use `box-shadow` or `text-shadow`, will be removed with `forced-colors` and
					`inverted-colors`</Li
				>
			</Ul>
		</Section>
	</Article>
</LayoutCenter>
