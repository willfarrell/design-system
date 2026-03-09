<script>
import Example from "@components/Example.svelte";
import Snippet from "@components/Snippet.svelte";
import Codeblock from "@design-system/components/Codeblock.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import H3 from "@design-system/components/Heading3.svelte";
import H4 from "@design-system/components/Heading4.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import LayoutCenter from "@design-system/components/LayoutCenter.svelte";
import Table from "@design-system/components/Table.svelte";
import A from "@design-system/elements/a.svelte";
import Article from "@design-system/elements/article.svelte";
import Code from "@design-system/elements/code.svelte";
import Div from "@design-system/elements/div.svelte";
import Footer from "@design-system/elements/footer.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import Li from "@design-system/elements/li.svelte";
import Main from "@design-system/elements/main.svelte";
import P from "@design-system/elements/p.svelte";
import Section from "@design-system/elements/section.svelte";
import Small from "@design-system/elements/small.svelte";
import Time from "@design-system/elements/time.svelte";
import Ul from "@design-system/elements/ul.svelte";
</script>

<svelte:head>
	<title>Full (ltr) | Design System</title>
	<meta name="description" content="All semantic fluid design system components" />
</svelte:head>

<LayoutCenter>
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
				- article (centered, full-width breakouts) - documentation (aside, scrollspy) - faceted
				search - form input
			</P>
			<H3>Horizontal rule</H3>
			<Example component="horizontal-rule" />
			<H3>Colour</H3>
			<H3>Theme override</H3>
			<P>- CSS Rules</P>
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
			<!-- <Example component="heading-group"  /> --><!-- applied above -->
			<Example component="headings" />

			<H3>Paragraphs</H3>
			<Example component="paragraphs" />
			<!--
			Source:
			  - Why 60ch, WCAG needs 80ch: https://meyerweb.com/eric/thoughts/2018/06/28/what-is-the-css-ch-unit/
			  -->
			<H3>Inline style elements</H3>
			<Example component="inline-style-elements" />
			<H3>Inline format elements</H3>
			<Example component="inline-format-elements" />
			<H3>Links</H3>
			<Example component="link" />
			<Example component="link-button" />
			<Example component="link-mailto" />
			<Example component="link-tel" />
			<Example component="link-skip" />
			<Example component="link-back" />
			<Example component="link-back-to-top" />
			<Example component="link-tag" />

			<H3>Lists</H3>
			<H4>Unordered</H4>
			<Example component="list-unordered" />
			<H4>Ordered</H4>
			<Example component="list-ordered" />
			<H4>Descriptions</H4>
			<Example component="list-description" />
		</Section>
		<Section>
			<H2>Forms</H2>
			<H3>Buttons</H3>
			<Example component="button" />
			<P>- print - copy</P>
			<H3>Text inputs</H3>
			<Example component="form-input-text" />
			<Example component="form-input-name" />
			<Example component="form-input-email" />
			<Example component="form-input-tel" />
			<Example component="form-input-url" />
			<Example component="form-input-password" />
			<H3>Number inputs</H3>
			<Example component="form-input-number" />
			<Example component="form-input-one-time-code" />
			<H3>Date input</H3>
			<Example component="form-input-date" />
			<H3>Date picker [Avoid]</H3>
			<Example component="form-input-datepicker" />
			<H3>Search input</H3>
			<Example component="form-input-search" />
			<H3>Address input</H3>
			<Example component="form-input-address" />
			<H3>Checkboxes</H3>
			<Example component="form-input-checkbox" />
			<H3>Radios</H3>
			<Example component="form-input-radio" />
			<H3>Select [Avoid]</H3>
			<Example component="form-input-select" />
			<Example component="form-input-select-multiple" />
			<!--<H3>Data list</H3>
			<Example component="form-input-datalist" />-->
			<H3>Textarea</H3>
			<Example component="form-input-textarea" />
			<H3>File input</H3>
			<Example component="form-input-file" />
			<H3>WebAuthn</H3>
			<Example component="form-input-webauthn" />

			<H3>Input focus</H3>
			<Example component="form-input-focus" />
			<H3>Errors</H3>
			<Example component="form-errors" />
		</Section>
		<Section>
			<H2>Media elements</H2>
			<H3>Icons</H3>
			<Example component="icon" />
			<H3>Images</H3>
			<H3>Video</H3>
			<P>- HTML - Vimeo? - Youtube?</P>
			<H3>Audio</H3>
			<H3>Chart (Histogram)</H3>
			<H3>Chart (Scatter)</H3>
			<H3>Map</H3>
		</Section>
		<Section>
			<H2>Components</H2>
			<H3>Accordion</H3>
			<Example component="accordion" />
			<Example component="accordion-chevron" />
			<H3>Address</H3>
			<Example component="address" />
			<H3>Alert</H3>
			<Example component="alert" />
			<H3>Badge</H3>
			<Example component="badge" />
			<H3>Banner</H3>
			<H3>Blockquote</H3>
			<Example component="blockquote" />
			<H3>Callout</H3>
			<Example component="callout" />
			<H3>Card</H3>
			<Example component="card" />
			<H3>Code block</H3>
			<H3>Data formatters</H3>
			<Example component="data-bytes" />
			<Example component="data-enum" />
			<Example component="data-number" />
			<Example component="data-time" />
			<H3>Disclosure</H3>
			<Example component="details" />
			<Example component="details-chevron" />
			<H3>Dialog [Avoid]</H3>
			<Example component="dialog" />
			<H3>Dropdown</H3>
			<H3>Form Aside (Faceted search)</H3>
			<H3>Header</H3>
			<P>- multi-locale - search</P>
			<H3>Footer</H3>
			<H3>Footnotes</H3>
			<Example component="footnotes" />
			<H3>Nav Aside</H3>
			<H3>Nav Scrollspy</H3>
			<H3>Pagination (Numbered)</H3>
			<H3>Pagination (Next/Prev)</H3>
			<H3>Popover</H3>
			<Example component="popover" />
			<H3>Tabs [Avoid]</H3>
			<H3>Table</H3>
			<Example component="table" />
			<H3>Tag</H3>
			<Example component="tag" />
			<H3>Task list</H3>
			<Example component="task-list" />
		</Section>
		<Section>
			<H3>Grid</H3>
			<Example component="grid-cards" />
		</Section>
		<Section>
			<H2>Map</H2>
			<H3>Style</H3>
			<P>- colours - patterns</P>
			<H3>Tiles</H3>
			<P>- PMTiles + Brotli</P>
			<H3>Component</H3>
		</Section>
	</Article>
</LayoutCenter>
