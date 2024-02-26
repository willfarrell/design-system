<script>
	
	import Head from '@components/Head.svelte';
	
	import PageHeader from '@components/Header.svelte';
	
	import Example from '@components/Example.svelte'
	
	import PageFooter from '@components/Footer.svelte';
	
	import Header from '@design-system/svelte/element/header.svelte';
	import Nav from '@design-system/svelte/element/nav.svelte';
	import Main from '@design-system/svelte/element/main.svelte';
	import Article from '@design-system/svelte/element/article.svelte';
	import Section from '@design-system/svelte/element/section.svelte';
	import Div from '@design-system/svelte/element/div.svelte';
	import Hgroup from '@design-system/svelte/element/hgroup.svelte';
	import H1 from '@design-system/svelte/Heading1.svelte';
	import HSub from '@design-system/svelte/HeadingSub.svelte';
	import Time from '@design-system/svelte/element/time.svelte';
	import H2 from '@design-system/svelte/Heading2.svelte';
	import H3 from '@design-system/svelte/Heading3.svelte';
	import H4 from '@design-system/svelte/Heading4.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import Small from '@design-system/svelte/element/small.svelte';
	import Ul from '@design-system/svelte/element/ul.svelte';
	import Li from '@design-system/svelte/element/li.svelte';
	import Table from '@design-system/svelte/Table.svelte';
	import Code from '@design-system/svelte/element/code.svelte';

	import Codeblock from '@design-system/svelte/Codeblock.svelte';

	import Footer from '@design-system/svelte/element/footer.svelte';

	import Snippet from '@components/Snippet.svelte';

	const fontSize = 16; // px
	const fontScale = 0.5; // vw
	const deviceSizes = [360, 480, 768, 1024, 1280, 1920]; // px
</script>

<svelte:head>
	<Head>
		<title>All | Design System</title>
		<meta name="description" content="All sematic fluid design system components" />
	</Head>
</svelte:head>
<PageHeader/>
<Main class="container">
	<Article>
		<Example component="heading-group" />
		<!--
		Source: 
		  https://adrianroselli.com/2020/08/be-wary-of-doc-subtitle.html
		  https://www.tpgi.com/subheadings-subtitles-alternative-titles-and-taglines-in-html/
		  -->
		
		<Section>
			<H2>Style</H2>
			<H3>Template</H3>
			<H3>Layouts</H3>
			<P>
			- article (centered, full-width breakouts)
			- documentation (aside, scrollspy)
			- faceted search
			- form input
		</P>
			<H3>Horizontal rule</H3>
			<Example component="horizontal-rule"  />
			<H3>Colour</H3>
			<H3>Theme override</H3>
			<P>
			- CSS Rules
		</P>
		</Section>
		
		<Section>
			<H2>Typography</H2>
			<H3>Typeface</H3>
			<Code>system-ui, sans-serif</Code>
			<!--
				Ref:
				  - https://fonts.google.com/knowledge/readability_and_accessibility/introducing_accessibility_in_typography
				  - https://www.unicodepedia.com/groups/
			  -->
			<H3>Type scale</H3>
			<P>16px (default) + View port width * 0.05/100</P>
			<H3>Headings</H3>
			<Example component="headings"  />

			<H3>Paragraphs</H3>
			<Example component="paragraphs"  />
			<!--
			Source:
			  - Why 60ch, WCAG needs 80ch: https://meyerweb.com/eric/thoughts/2018/06/28/what-is-the-css-ch-unit/
			  -->
			<H3>Inline text elements</H3>
			<Example component="inline-text-elements"  />
			<H3>Links</H3>
			<P>
			- inline (default,hover,active,external) link
			- back link
			- tag link
			- back to top link
			- skip link
			- mailto
			- tel
		</P>
			<H3>Lists</H3>
			<H4>Unordered</H4>
			<Example component="list-unordered"  />
			<H4>Ordered</H4>
			<Example component="list-ordered"  />
			<H4>Descriptions</H4>
			<Example component="list-description"  />
		</Section>
		<Section>
			<H2>Forms</H2>
			<H2>Buttons</H2>
			<Example component="button"  />
				<P>- print
				- copy</P>
			<H3>Errors</H3>
			<Example component="form-errors"  />
			<H3>Text inputs</H3>
			<Example component="form-input-text"  />
				<P>TODO break into parts
				- name [Privacy]
				- email [Privacy]
				- phone [Privacy]</P>
			<H3>Number inputs</H3>
			<Example component="form-input-number"  />
			<H3>Date picker [Avoid]</H3>
			<H3>Date input</H3>
			<Example component="form-input-date"  />
			<H3>Search input</H3>
			<Example component="form-input-search"  />
				<P>TODO - Address Input</P>
			<H3>Checkboxes</H3>
			<Example component="form-input-checkbox"  />
			<H3>Radios</H3>
			<Example component="form-input-radio"  />
			<H3>Select [Avoid]</H3>
			<Example component="form-input-select"  />
				Select Typeahead
			<H3>Textarea</H3>
			<Example component="form-input-textarea"  />
			<H3>File input</H3>
			<Example component="form-input-file"  />
				<P>Authentication
				- username
				- email [Avoid]
				- password [Avoid]
				- totp [Avoid]
				- WebAuthn / PassKey</P>
		</Section>
		<Section>
			<H2>Media elements</H2>
			<H3>Icons</H3>
			<H3>Images</H3>
			<H3>Video</H3>
			<P>- HTML
			- Vimeo?
			- Youtube?</P>
			<H3>Audio</H3>
			<H3>Chart (Histogram)</H3>
			<H3>Chart (Scatter)</H3>
			<H3>Map</H3>
		</Section>
		<Section>
			<H2>Components</H2>
			<H3>Accordion</H3>
			<Example component="accordion"  />
				<!--
					Ref: https://adrianroselli.com/2023/08/progressively-enhanced-html-accordion.html
				-->
			<H3>Address</H3>
			<Example component="address"  />
			<H3>Banner</H3>
			<H3>Blockquote</H3>
			<Example component="blockquote"  />
				<!--  https://adrianroselli.com/2023/07/blockquotes-in-screen-readers.html -->
			<H3>Card</H3>
			<Example component="card"  />
				<!--
					https://inclusive-components.design/cards/
				-->
			<H3>Code block</H3>
			<H3>Details</H3>
			<Example component="details"  />
			<H3>Dialog [Avoid]</H3>
			<Example component="dialog" />
			<H3>Dropdown</H3>
			<H3>Form Aside (Faceted search)</H3>
			<H3>Header</H3>
			<P>- multi-locale
			- search</P>
			<H3>Footer</H3>
			<H3>Footnotes</H3>
			<Example component="footnotes" />
			<!--
				TODO unfinished
				Ref: https://www.sitepoint.com/accessible-footnotes-css/
			-->
			<H3>Nav Aside</H3>
			<H3>Nav Scrollspy</H3>
			<H3>Pagination (Numbered)</H3>
			<H3>Pagination (Next/Prev)</H3>
			<H3>Tabs [Avoid]</H3>
			<H3>Table</H3>
			<Example component="table"  />
			<Example component="table-stripe"  />
				<!--
				// https://inclusive-components.design/data-tables/
				-->
		</Section>
		<Section>
			<H3>Grid</H3>
			<Example component="grid-cards"  />
		</Section>
		<Section>
			<H2>Map</H2>
			<H3>Style</H3>
			<P>- colours
			- patterns</P>
			<H3>Tiles</H3>
			<P>- PMTiles + Brotli</P>
			<H3>Component</H3>
		</Section>
	</Article>
</Main>
<PageFooter/>