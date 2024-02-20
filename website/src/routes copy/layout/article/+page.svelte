<script>
	import Nav from '@design-system/svelte/element/nav.svelte';
	import Main from '@design-system/svelte/element/main.svelte';
	import Article from '@design-system/svelte/element/article.svelte';
	import Section from '@design-system/svelte/element/section.svelte';
	import Hgroup from '@design-system/svelte/element/hgroup.svelte';
	import H1 from '@design-system/svelte/Heading1.svelte';
	import HSub from '@design-system/svelte/HeadingSub.svelte';
	import Time from '@design-system/svelte/element/time.svelte';
	import H2 from '@design-system/svelte/Heading2.svelte';
	import H3 from '@design-system/svelte/Heading3.svelte';
	import H4 from '@design-system/svelte/Heading4.svelte';
	import H5 from '@design-system/svelte/Heading5.svelte';
	import H6 from '@design-system/svelte/Heading6.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Abbr from '@design-system/svelte/element/abbr.svelte';
	import Address from '@design-system/svelte/element/address.svelte';
	import B from '@design-system/svelte/element/b.svelte';
	import Strong from '@design-system/svelte/element/strong.svelte';
	import Em from '@design-system/svelte/element/em.svelte';
	import I from '@design-system/svelte/element/i.svelte';
	import Del from '@design-system/svelte/element/del.svelte';
	import Ins from '@design-system/svelte/element/ins.svelte';
	import Code from '@design-system/svelte/element/code.svelte';
	import Kbd from '@design-system/svelte/element/kbd.svelte';
	import Mark from '@design-system/svelte/element/mark.svelte';
	import S from '@design-system/svelte/element/s.svelte';
	import Small from '@design-system/svelte/element/small.svelte';
	import Sub from '@design-system/svelte/element/sub.svelte';
	import Sup from '@design-system/svelte/element/sup.svelte';
	import U from '@design-system/svelte/element/u.svelte';
	import Var from '@design-system/svelte/element/var.svelte';
	import Ul from '@design-system/svelte/element/ul.svelte';
	import Ol from '@design-system/svelte/element/ol.svelte';
	import Li from '@design-system/svelte/element/li.svelte';
	import Button from '@design-system/svelte/element/button.svelte';
	import Img from '@design-system/svelte/element/img.svelte';

	import Blockquote from '@design-system/svelte/element/blockquote.svelte';
	import Footer from '@design-system/svelte/element/footer.svelte';
	import Cite from '@design-system/svelte/element/cite.svelte';

	import Table from '@design-system/svelte/Table.svelte';
	import Caption from '@design-system/svelte/element/caption.svelte';
	import Colgroup from '@design-system/svelte/element/colgroup.svelte';
	import Th from '@design-system/svelte/element/th.svelte';
	import Td from '@design-system/svelte/element/td.svelte';

	import PageHeader from '@components/Header.svelte';
	import Card from '@design-system/svelte/Card.svelte';
	import PageFooter from '@components/Footer.svelte';

	const paragraph =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
</script>

<svelte:head>
	<title>Article</title>
</svelte:head>

<PageHeader />

<Main class="container">
	<Article>
		<Section>
			<Hgroup>
				<H1>fluid design</H1>
				<HSub>Subheading</HSub>
				<HSub><Small>Published on <Time datetime="2000-01-01">January 1st, 2000</Time></Small></HSub
				>
			</Hgroup>
		</Section>
		<Section>
			<H2>Paragraphs</H2>
			<P>{paragraph}</P>
			<P>{paragraph}</P>
			<Blockquote>
				“The Semantic Web is not a separate Web but an extension of the current one, in which
				information is given well-defined meaning, better enabling computers and people to work in
				cooperation.”
				<Footer>
					— <Cite>Tim Berners-Lee</Cite>
				</Footer>
			</Blockquote>
			<P>{paragraph}</P>
			<P>{paragraph}</P>
			image
			<P>{paragraph}</P>
			<P>{paragraph}</P>
			<Table class="stripe">
				<Caption
					>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
					ut labore et dolore magna aliqua.</Caption
				>
				<thead>
					<tr>
						<Th scope="col">#</Th>
						<Th scope="col">Heading</Th>
						<Th scope="col">Heading</Th>
						<Th scope="col">Heading</Th>
						<Th scope="col">Heading</Th>
						<Th scope="col">Heading</Th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<Th scope="row">1</Th>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</tr>
					<tr>
						<Th scope="row">1</Th>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</tr>
					<tr>
						<Th scope="row">1</Th>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
						<Td>Cell</Td>
					</tr>
				</tbody>
			</Table>
			<P>{paragraph}</P>
			<P>{paragraph}</P>
		</Section>
		<Section>
			<H2>Glossary</H2>
		</Section>
		<Section>
			<H2>Footnotes</H2>
		</Section>
		<Section>
			<H2>Tags</H2>
			<A href="/tags/tag" rel="tag">tag</A>, <A href="/tags/tag" rel="tag">tag</A>, <A
				href="/tags/tag"
				rel="tag">tag</A
			>
		</Section>
	</Article>
	<Section>
		<Ul class="grid">
			<Card href="#" id="A card 0" let:id>
				<H3><A href="#" aria-describedby={id}>A card</A></H3>
				<P>Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur.</P>
				<span aria-hidden="true" {id}>Read more</span>
				<Img alt="" src="" slot="img" width="640" height="359" />
			</Card>
			<Card href="#" id="A card 1" let:id>
				<H3><A href="#" aria-describedby={id}>A card</A></H3>
				<P>Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur.</P>
				<span aria-hidden="true" {id}>Read more</span>
				<Img alt="" src="" slot="img" width="640" height="359" />
			</Card>
			<Card href="#" id="A card 2" let:id>
				<H3><A href="#" aria-describedby={id}>A card</A></H3>
				<P>Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur.</P>
				<span aria-hidden="true" {id}>Read more</span>
				<Img alt="" src="" slot="img" width="640" height="359" />
			</Card>
		</Ul>
	</Section>
</Main>
<PageFooter />
