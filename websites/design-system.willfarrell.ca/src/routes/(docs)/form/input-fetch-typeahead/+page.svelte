<script>
import Snippet from "@components/Snippet.svelte";
import Codeblock from "@design-system/components/Codeblock.svelte";
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
	title: "Fetch typeahead input",
	update: "2026-07-20",
};

const responseShape = `[
  { "value": "CA", "label": "Canada" },
  { "value": "US", "label": "United States", "href": "/countries/us" }
]`;
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="A fetch typeahead input suggests remote results as the user types, falling back to a native datalist without JavaScript." />
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
					<Li><A href="#fetch-contract">Fetch contract</A></Li>
					<Li><A href="#progressive-enhancement">Progressive enhancement</A></Li>
					<Li><A href="#internationalization">Internationalization</A></Li>
					<Li><A href="#accessibility">Accessibility</A></Li>
					<Li><A href="#related">Related</A></Li>
					<Li><A href="#variables">Variables</A></Li>
				</Ol>
			{/snippet}
		</NavScrollspy>
	{/snippet}
	<Section>
		<H2 id="description">Description</H2>
		<P>A fetch typeahead input suggests results from a remote endpoint as the user types. It is suited to large or dynamic datasets that cannot be pre-rendered, such as searching a database of records. Each keystroke is debounced and in-flight requests are cancelled, so only the most recent query is shown.</P>
		<P>When the confirmed suggestion carries an <Code>href</Code>, the browser navigates to it — useful for search and navigation. Otherwise the input value is set to the suggestion label, for use inside a form.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="form-input-fetch-typeahead" />
	</Section>
	<Section>
		<H2 id="fetch-contract">Fetch contract</H2>
		<P>Suggestions are requested from the endpoint named by <Code>src</Code>. The current query is appended as a parameter named by <Code>param</Code> (defaults to <Code>q</Code>). Any entries in the <Code>criteria</Code> object are appended as additional <Code>data-criteria-*</Code> query parameters, letting you scope results by other filters.</P>
		<Ul>
			<Li><Code>src</Code> — endpoint base URL, rendered as <Code>data-src</Code>.</Li>
			<Li><Code>param</Code> — query parameter name for the typed text, rendered as <Code>data-param</Code> (default <Code>q</Code>).</Li>
			<Li><Code>criteria</Code> — an object of extra filters, each rendered as <Code>data-criteria-&lt;key&gt;</Code> and sent as a query parameter.</Li>
		</Ul>
		<P>The request is sent with an <Code>Accept: application/json</Code> header and same-origin credentials. The endpoint must respond with a JSON array of items. Each item needs a <Code>label</Code> (shown in the menu and used as the input value); <Code>value</Code> and <Code>href</Code> are optional, and any additional fields are ignored. When an item has an <Code>href</Code>, confirming it navigates the browser there instead of filling the field.</P>
		<Codeblock language="js" code={responseShape} />
	</Section>
	<Section>
		<H2 id="progressive-enhancement">Progressive enhancement</H2>
		<P>The component wraps a plain input associated with a local <Code>&lt;datalist&gt;</Code>. Without JavaScript, the native datalist provides basic matching against the options you render as children.</P>
		<P>With JavaScript, those same datalist options become the offline fallback: if a fetch request fails, the menu is populated from the local options filtered case-insensitively against the query, and the error message is announced. This keeps the field usable even when the endpoint is unreachable.</P>
		<Ul>
			<Li>No JavaScript — native <Code>&lt;datalist&gt;</Code> matching on the rendered options.</Li>
			<Li>JavaScript, endpoint reachable — remote suggestions, debounced by 250&nbsp;ms with stale requests cancelled through an <Code>AbortController</Code>.</Li>
			<Li>JavaScript, fetch failure — the local datalist options are filtered as a fallback.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="internationalization">Internationalization</H2>
		<P>The status messages shown in the suggestions menu are overridable so they can be translated.</P>
		<Ul>
			<Li><Code>textLoading</Code> — shown while a request is in flight, rendered as <Code>data-i18n-loading</Code>.</Li>
			<Li><Code>textError</Code> — shown when a request fails, rendered as <Code>data-i18n-error</Code>.</Li>
			<Li><Code>textNoResults</Code> — shown when the response is empty, rendered as <Code>data-i18n-no-results</Code>.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>The enhanced input exposes an <A href="https://www.w3.org/WAI/ARIA/apg/patterns/combobox/">ARIA combobox</A> with a listbox of options and a live-region status announcing result counts.</Li>
			<Li>The label association is preserved: the enhanced input keeps the original <Code>id</Code>, so the existing <Code>&lt;label for="id"&gt;</Code> still applies.</Li>
			<Li>Suggestions confirm on selection, not on blur, so leaving the field never silently changes the entered value.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/form/input-select-typeahead">Select typeahead</A> — for a fixed, pre-rendered list of options.</Li>
			<Li><A href="/form/input-search">Search input</A> — for free-text search without suggestions.</Li>
			<Li><A href="/form/errors">Errors</A> — for error handling patterns.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<P>None for input</P>
	</Section>
</LayoutTableOfContents>
