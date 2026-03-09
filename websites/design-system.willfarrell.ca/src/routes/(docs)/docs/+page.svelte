<script>
import Card from "@design-system/components/Card.svelte";
import DataTime from "@design-system/components/DataTime.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import H3 from "@design-system/components/Heading3.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import LayoutTableOfContents from "@design-system/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@design-system/components/NavScrollspy.svelte";
import A from "@design-system/elements/a.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import Li from "@design-system/elements/li.svelte";
import Ol from "@design-system/elements/ol.svelte";
import P from "@design-system/elements/p.svelte";
import Section from "@design-system/elements/section.svelte";
import Small from "@design-system/elements/small.svelte";
import Ul from "@design-system/elements/ul.svelte";

const page = {
	title: "Documentation",
	update: "2026-03-05",
};

const designTokens = [
	{ href: "/design-token/typography", title: "Typography", description: "Font family, size, weight, and line-height configuration" },
	{ href: "/design-token/font-size", title: "Font size", description: "Responsive typography scale with fluid sizing" },
	{ href: "/design-token/font-weight", title: "Font weight", description: "Font weight values and usage guidelines" },
];

const text = [
	{ href: "/text/headings", title: "Headings", description: "Heading hierarchy for document structure" },
	{ href: "/text/heading-group", title: "Heading group", description: "Pair headings with subtitles using hgroup" },
	{ href: "/text/paragraph", title: "Paragraphs", description: "Block text with relative font sizing" },
	{ href: "/text/links", title: "Links", description: "Navigation links with semantic HTML" },
	{ href: "/text/inline-style", title: "Style inline elements", description: "Semantic elements for emphasis and styling" },
	{ href: "/text/inline-format", title: "Style format elements", description: "Editorial marks for deletions, insertions, and highlights" },
	{ href: "/text/list-ol", title: "List (ordered)", description: "Sequenced lists with screen reader semantics" },
	{ href: "/text/list-ul", title: "List (unordered)", description: "Unordered lists without inherent sequence" },
	{ href: "/text/list-dl", title: "List (description)", description: "Description lists for glossaries and key-value pairs" },
	{ href: "/text/address", title: "Address", description: "Contact information with semantic markup" },
	{ href: "/text/details", title: "Disclosure", description: "Show/hide content with disclosure widget" },
	{ href: "/text/accordion", title: "Accordion", description: "Grouped disclosure sections with exclusive open states" },
	{ href: "/text/blockquote", title: "Blockquote", description: "Extended quotations with attribution" },
	{ href: "/text/callout", title: "Callout", description: "Supplementary information boxes" },
	{ href: "/text/alert", title: "Alert", description: "Urgent messages announced via live regions" },
	{ href: "/text/table", title: "Table", description: "Tabular data with header scoping and accessibility" },
	{ href: "/text/footnotes", title: "Footnotes", description: "Supplementary references linked within content" },
	{ href: "/text/horizontal-rule", title: "Horizontal rule", description: "Thematic breaks between content sections" },
];

const form = [
	{ href: "/form/errors", title: "Errors", description: "Validation messages associated with form fields" },
	{ href: "/form/buttons", title: "Button", description: "In-page actions using native button elements" },
	{ href: "/form/input-text", title: "Text", description: "Single-line text input with visible labels" },
	{ href: "/form/input-name", title: "Name", description: "Name inputs with autocomplete support" },
	{ href: "/form/input-email", title: "Email address", description: "Email field with optimized mobile keyboard" },
	{ href: "/form/input-tel", title: "Telephone number", description: "Telephone input with dial pad on mobile" },
	{ href: "/form/input-url", title: "URL", description: "URL field with format validation" },
	{ href: "/form/input-password", title: "Password", description: "Masked text with show/hide toggle" },
	{ href: "/form/input-webauthn", title: "WebAuthn", description: "Passwordless authentication inputs" },
	{ href: "/form/input-date", title: "Date", description: "Native date picker with calendar widget" },
	{ href: "/form/input-address", title: "Address", description: "Grouped address fields in a fieldset" },
	{ href: "/form/input-textarea", title: "Textarea", description: "Multi-line text input for longer content" },
	{ href: "/form/input-number", title: "Number", description: "Numeric input with increment/decrement controls" },
	{ href: "/form/input-one-time-code", title: "One time code", description: "Verification code input with SMS autofill" },
	{ href: "/form/input-select", title: "Select", description: "Native dropdown list with minimal styling" },
	{ href: "/form/input-radio", title: "Radios", description: "Single-selection option group in a fieldset" },
	{ href: "/form/input-checkbox", title: "Checkboxes", description: "Multi-selection checkboxes or toggle switches" },
	{ href: "/form/input-file", title: "File", description: "Browser-native file picker control" },
	{ href: "/form/input-search", title: "Search", description: "Search field with clear button" },
];

const components = [
	{ href: "/component/dialog", title: "Dialog", description: "Modal overlay using native dialog element" },
	{ href: "/component/task-list", title: "Task list", description: "Checklist with completion states" },
	{ href: "/component/card", title: "Card", description: "Container grouping related content and actions" },
	{ href: "/component/badge", title: "Badge", description: "Inline label for counts or status" },
	{ href: "/component/tag", title: "Tag", description: "Keyword label for categorization" },
	{ href: "/component/icon", title: "Icon", description: "SVG icon from sprite sheet" },
	{ href: "/component/popover", title: "Popover", description: "Non-modal overlay using HTML popover attribute" },
	{ href: "/component/data-bytes", title: "DataBytes", description: "File size formatter with locale-aware units" },
	{ href: "/component/data-number", title: "DataNumber", description: "Numeric formatter with locale-aware styles" },
	{ href: "/component/data-time", title: "DataTime", description: "Date/time formatter with semantic time element" },
	{ href: "/component/data-enum", title: "DataEnum", description: "Value-to-label mapper for enums and statuses" },
];

const layouts = [
	{ href: "/layout/article", title: "Article", description: "Center-focused single-column template" },
	{ href: "/layout/documentation", title: "Documentation", description: "Two-column with sidebar and table of contents" },
	{ href: "/layout/form", title: "Form", description: "Full-viewport form with centered content" },
	{ href: "/layout/search", title: "Search", description: "Aside-based layout with filters and results" },
	{ href: "/layout/slices", title: "Slices", description: "Full-width hero sections and content blocks" },
];
</script>

<svelte:head>
	<title>{page.title} | Design System</title>
	<meta name="description" content="Design system documentation covering design tokens, text, forms, components, and layouts" />
</svelte:head>

{#snippet cardGrid(items)}
	<Ul class="grid">
		{#each items as item}
			<Li><Card id={item.title}>
				<H3><A href={item.href}>{item.title}</A></H3>
				<P>{item.description}</P>
			</Card></Li>
		{/each}
	</Ul>
{/snippet}

<LayoutTableOfContents>
	{#snippet header()}
		<Hgroup>
			<H1>{page.title}</H1>
			<HSub><Small>Published on <DataTime datetime={page.update} /></Small></HSub>
		</Hgroup>
	{/snippet}
	{#snippet aside()}
		<NavScrollspy>
			{#snippet children()}
				<Ol>
					<Li><A href="#design-tokens">Design tokens</A></Li>
					<Li><A href="#text">Text</A></Li>
					<Li><A href="#form">Form</A></Li>
					<Li><A href="#components">Components</A></Li>
					<Li><A href="#layouts">Layouts</A></Li>
				</Ol>
		{/snippet}

		</NavScrollspy>
	{/snippet}
	<Section>
		<H2 id="design-tokens">Design tokens</H2>
		{@render cardGrid(designTokens)}
	</Section>
	<Section>
		<H2 id="text">Text</H2>
		{@render cardGrid(text)}
	</Section>
	<Section>
		<H2 id="form">Form</H2>
		{@render cardGrid(form)}
	</Section>
	<Section>
		<H2 id="components">Components</H2>
		{@render cardGrid(components)}
	</Section>
	<Section>
		<H2 id="layouts">Layouts</H2>
		{@render cardGrid(layouts)}
	</Section>
</LayoutTableOfContents>
