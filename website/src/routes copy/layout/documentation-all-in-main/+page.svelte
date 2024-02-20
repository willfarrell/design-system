<script>
	import Nav from '@design-system/svelte/element/nav.svelte';
	import Aside from '@design-system/svelte/element/aside.svelte';
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
	import Details from '@design-system/svelte/element/details.svelte';
	import Summary from '@design-system/svelte/element/summary.svelte';

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
	<title>Documentation</title>
</svelte:head>

<PageHeader />

<Main class="container-asides">
	<Aside id="grid-menu">
		<Nav>
			<A href="/layout/documentation">link</A>
			<A href="/layout">link</A>
			<Strong>label</Strong>
			<A href="/layout">link</A>
			<A href="/layout">link</A>
			<Details open>
				<Summary>Label</Summary>
				<A href="/layout">link</A>
				<A href="/layout">link</A>
			</Details>
		</Nav>
	</Aside>
	<Hgroup id="grid-header">
		<H1>fluid design</H1>
		<HSub>Subheading</HSub>
		<HSub><Small>Published on <Time datetime="2000-01-01">January 1st, 2000</Time></Small></HSub>
	</Hgroup>
	<Aside id="grid-table-of-content">
		<Nav>
			<Ul><Li>Link</Li></Ul>
		</Nav>
	</Aside>
	<div role="document" id="grid-body">
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
	</div>
	<!-- TODO nav prev/next -->
</Main>
<PageFooter />

<style>
	:global(.container-asides) {
		display: grid;
		gap: 3rem;
		grid-template-rows: auto auto 1fr;
		grid-template-columns: 1fr;
		grid-template-areas:
			'header'
			'table-of-content'
			'body';
	}
	:global(#grid-header) {
		grid-area: header;
	}
	:global(#grid-table-of-content) {
		grid-area: table-of-content;
	}
	:global(#grid-body) {
		grid-area: body;
	}
	@media (min-width: 60em) {
		:global(.container-asides) {
			grid-template-rows: auto auto 1fr;
			grid-template-columns: auto minmax(1fr, 60ch);
			grid-template-areas:
				'menu header'
				'menu table-of-content'
				'menu body';
		}
		:global(#grid-menu) {
			grid-area: menu;
			max-inline-size: 20ch;
			place-self: start end;
		}
	}
	@media (min-width: 80em) {
		:global(.container-asides) {
			grid-template-rows: auto 1fr;
			grid-template-columns: auto 60ch auto;
			grid-template-areas:
				'menu header table-of-content'
				'menu body table-of-content'
				'menu body table-of-content';
		}
		:global(#grid-table-of-content) {
			max-inline-size: 20ch;
		}
	}
</style>
