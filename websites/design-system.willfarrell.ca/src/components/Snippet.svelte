<script>
import Example from "@components/Example.svelte";
import Codeblock from "@design-system/svelte/Codeblock.svelte";
import A from "@design-system/svelte/element/a.svelte";
import Details from "@design-system/svelte/element/details.svelte";
import Div from "@design-system/svelte/element/div.svelte";
import Footer from "@design-system/svelte/element/footer.svelte";
import Header from "@design-system/svelte/element/header.svelte";
import Iframe from "@design-system/svelte/element/iframe.svelte";
import Summary from "@design-system/svelte/element/summary.svelte";
import { mount } from "svelte";
import { render } from "svelte/server";

let { example } = $props();

let { html } = render(Example, { props: { component: example } });
// Remove unused comments
html = html.replace(/<!--[[\]]*-->\n*/g, "");
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

<style global>
	.snippet {
		/* border: var(--border-width) solid currentColor; */
		padding: var(--padding-fixed) 0;

		footer {
			margin-block-start: var(--padding-fixed);
		}

		iframe {
			border: var(--border-width) solid var(--border-color, currentColor);
			width: 100%;
			height: 15em;
			max-inline-size: 60ch;
			resize: both;
			overflow: auto;
		}
	}
</style>
