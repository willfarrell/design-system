<script>
import Example from "@components/Example.svelte";
import Codeblock from "@design-system/components/Codeblock.svelte";
import A from "@design-system/elements/a.svelte";
import Details from "@design-system/elements/details.svelte";
import Div from "@design-system/elements/div.svelte";
import Footer from "@design-system/elements/footer.svelte";
import Header from "@design-system/elements/header.svelte";
import Iframe from "@design-system/elements/iframe.svelte";
import Summary from "@design-system/elements/summary.svelte";
import formatHtml from "pretty";
import { mount } from "svelte";
import { render } from "svelte/server";

let { example } = $props();

const html = $derived.by(() => {
	let { html } = render(Example, { props: { component: example } });
	// Remove unused comments
	html = html.replace(/(<!--[[\]\d-]*-->|<!>)\n*/g, "");
	return formatHtml(html, { ocd: true });
});
</script>

<Div class="snippet">
	<Header><A href="/demo/{example}" target="_blank">Open in new tab</A></Header>
	<!-- <Example component={example} /> -->
	<Iframe title={example} src="/demo/{example}" />
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
