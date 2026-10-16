<script>
import NavScrollspy from "@willfarrell-ds/svelte/components/NavScrollspy.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import H2 from "@willfarrell-ds/svelte/elements/h2.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Ol from "@willfarrell-ds/svelte/elements/ol.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Section from "@willfarrell-ds/svelte/elements/section.svelte";
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
