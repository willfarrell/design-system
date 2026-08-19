<script>
import Snippet from "@components/Snippet.svelte";
import DataTime from "@design-system/components/DataTime.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import LayoutTableOfContents from "@design-system/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@design-system/components/NavScrollspy.svelte";
import A from "@design-system/elements/a.svelte";
import Code from "@design-system/elements/code.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import Li from "@design-system/elements/li.svelte";
import Ol from "@design-system/elements/ol.svelte";
import P from "@design-system/elements/p.svelte";
import Section from "@design-system/elements/section.svelte";
import Small from "@design-system/elements/small.svelte";
import Ul from "@design-system/elements/ul.svelte";

const page = {
	group: "Form",
	title: "Select typeahead input",
	update: "2026-07-20",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="The select typeahead input progressively enhances a native select into a filterable combobox for long option lists." />
</svelte:head>

<LayoutTableOfContents>
	{#snippet header()}
		<Hgroup>
			<HSub>{page.group}</HSub>
			<H1>{page.title}</H1>
			<HSub><Small>Published on <DataTime datetime={page.update} /></Small></HSub>
		</Hgroup>
	{/snippet}
	{#snippet aside()}
		<NavScrollspy>
			{#snippet children()}
				<Ol>
					<Li><A href="#description">Description</A></Li>
					<Li><A href="#example">Example</A></Li>
					<Li><A href="#accessibility">Accessibility</A></Li>
					<Li><A href="#internationalization">Internationalization</A></Li>
					<Li><A href="#references">References</A></Li>
					<Li><A href="#related">Related</A></Li>
					<Li><A href="#variables">Variables</A></Li>
				</Ol>
		{/snippet}

		</NavScrollspy>
	{/snippet}
	<Section>
		<H2 id="description">Description</H2>
		<P>The select typeahead input lets people filter a long list of options by typing, while keeping the behaviour of a native <Code>&lt;select&gt;</Code>. All options are pre-rendered in the page and no requests are made — typing simply narrows the visible list.</P>
		<P>It is built as a progressive enhancement. Without JavaScript the control renders as a plain <Code>&lt;select&gt;</Code> and works normally; the browser downloads the enhancement only when the field scrolls into view. Once enhanced, the visible input shows the chosen option's label while the underlying <Code>&lt;select&gt;</Code> keeps its value, so form submissions are unchanged.</P>
		<P>Prefer a plain <A href="/form/input-select">select</A> — or better, <A href="/form/input-radio">radios</A> — when there are only a handful of options. Reach for the typeahead only for long lists (countries, currencies, timezones) where filtering meaningfully reduces effort.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="form-input-select-typeahead" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The enhanced control exposes a <Code>combobox</Code> with an attached <Code>listbox</Code>, following the WAI-ARIA authoring practices for autocomplete.</Li>
			<Li>Keyboard: type to filter, <Code>ArrowDown</Code> / <Code>ArrowUp</Code> to move through results, <Code>Enter</Code> to confirm, and <Code>Escape</Code> to dismiss the menu.</Li>
			<Li>A polite live region announces the number of available results and the highlighted option to screen reader users.</Li>
			<Li>The native <Code>&lt;label for&gt;</Code> stays associated with the enhanced input, so the field keeps its accessible name.</Li>
			<Li>Because the base control is a real <Code>&lt;select&gt;</Code>, keyboard and assistive technology support is guaranteed even if the enhancement fails to load.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="internationalization">Internationalization</H2>
		<P>The "no results" message is set with the <Code>textNoResults</Code> prop, which is forwarded to the web component as <Code>data-i18n-no-results</Code>. Provide a translated string per locale.</P>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/">Combobox Pattern</A> — WAI-ARIA Authoring Practices</Li>
			<Li><A href="https://adrianroselli.com/2021/03/under-engineered-select-menus.html">Under-Engineered Select Menus</A> — Adrian Roselli</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/form/input-select">Select</A> — for short option lists</Li>
			<Li><A href="/form/input-radio">Radio buttons</A> — for a few visible options</Li>
			<Li><A href="/form/input-search">Search</A> — for querying beyond a fixed list</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None for input</P>
	</Section>
</LayoutTableOfContents>
