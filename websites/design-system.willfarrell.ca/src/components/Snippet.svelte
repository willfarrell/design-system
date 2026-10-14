<script>
import Codeblock from "@willfarrell-ds/svelte/components/Codeblock.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Details from "@willfarrell-ds/svelte/elements/details.svelte";
import Div from "@willfarrell-ds/svelte/elements/div.svelte";
import Footer from "@willfarrell-ds/svelte/elements/footer.svelte";
import Header from "@willfarrell-ds/svelte/elements/header.svelte";
import Iframe from "@willfarrell-ds/svelte/elements/iframe.svelte";
import Summary from "@willfarrell-ds/svelte/elements/summary.svelte";
import formatHtml from "pretty";
import { render } from "svelte/server";
import Example from "#components/Example.svelte";

let { example } = $props();

const html = $derived.by(() => {
	let { html } = render(Example, { props: { component: example } });
	// Remove unused comments
	html = html.replace(/(<!--[^>]*-->|<!>)\n*/g, "");
	return formatHtml(html, { ocd: true });
});
</script>

<Div class="snippet">
	<Header><A href="/demo/{example}" target="_blank">Open in new tab</A></Header>
	<Iframe title={example} src="/demo/{example}" sandbox="allow-scripts allow-same-origin allow-forms allow-downloads" />
	<Footer>
		<Details>
			<Summary>View HTML markup</Summary>
			<Codeblock language="html" code={html} />
		</Details>
	</Footer>
</Div>

<style>
	:global(.snippet) {
				/* border: var(--border-width) solid currentColor; */
				padding: var(--padding-fixed) 0;

				:global(footer) {
					margin-block-start: var(--padding-fixed);
				}

				:global(iframe) {
					border: var(--border-width) solid var(--border-color, currentColor);
					inline-size: 100%;
					block-size: 15em;
					resize: both;
					overflow: auto;
				}
			}
</style>
