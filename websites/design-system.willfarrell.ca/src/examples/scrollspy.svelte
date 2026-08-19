<script>
import NavScrollspy from "@design-system/components/NavScrollspy.svelte";
import A from "@design-system/elements/a.svelte";
import H2 from "@design-system/elements/h2.svelte";
import Li from "@design-system/elements/li.svelte";
import Ol from "@design-system/elements/ol.svelte";
import P from "@design-system/elements/p.svelte";
import Section from "@design-system/elements/section.svelte";
</script>

<NavScrollspy>
	{#snippet children()}
		<Ol>
			<Li><A href="#introduction">Introduction</A></Li>
			<Li><A href="#usage">Usage</A></Li>
			<Li><A href="#accessibility">Accessibility</A></Li>
		</Ol>
	{/snippet}
</NavScrollspy>

<Section>
	<H2 id="introduction">Introduction</H2>
	<P>Scroll the frame to see the matching link highlight as each section reaches the top half of the viewport.</P>
</Section>
<Section>
	<H2 id="usage">Usage</H2>
	<P>Each link points to the id of a section heading. The active link is marked as you read down the page.</P>
</Section>
<Section>
	<H2 id="accessibility">Accessibility</H2>
	<P>The link for the section in view receives aria-current="true" so assistive technology announces the current location.</P>
</Section>

<style>
	:global(nav[is="ds-scrollspy"]) {
		position: sticky;
		inset-block-start: 0;
		background: var(--color-l0);
	}
	:global(section:has(> h2[id])) {
		min-block-size: 9em;
	}
</style>
