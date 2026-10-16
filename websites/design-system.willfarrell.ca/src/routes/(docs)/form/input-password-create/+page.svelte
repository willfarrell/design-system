<script>
import DataTime from "@willfarrell-ds/svelte/components/DataTime.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import LayoutTableOfContents from "@willfarrell-ds/svelte/components/LayoutTableOfContents.svelte";
import NavScrollspy from "@willfarrell-ds/svelte/components/NavScrollspy.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Hgroup from "@willfarrell-ds/svelte/elements/hgroup.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Ol from "@willfarrell-ds/svelte/elements/ol.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Section from "@willfarrell-ds/svelte/elements/section.svelte";
import Small from "@willfarrell-ds/svelte/elements/small.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
import Snippet from "#components/Snippet.svelte";

const page = {
	group: "Form",
	title: "Password (create)",
	update: "2026-10-10",
};
</script>

<svelte:head>
	<title>{page.title} | {page.group} | Design System</title>
	<meta name="description" content="The password create input sets autocomplete to new-password so browsers offer to generate and save a strong password." />
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
					<Li><A href="#references">References</A></Li>
					<Li><A href="#related">Related</A></Li>
					<Li><A href="#variables">Variables</A></Li>
				</Ol>
		{/snippet}

		</NavScrollspy>
	{/snippet}
	<Section>
		<H2 id="description">Description</H2>
		<P>The password create input is a <A href="/form/input-password">Password input</A> with <Code>autocomplete="new-password"</Code>. Use it when someone sets or changes a password, so browsers and password managers offer to generate one and save it.</P>
		<P>Put a username field before it in the same form so the saved password is stored against the right account.</P>
	</Section>
	<Section>
		<H2 id="example">Example</H2>
		<Snippet example="form-input-password-create" />
	</Section>
	<Section>
		<H2 id="accessibility">Accessibility</H2>
		<Ul>
			<Li>Use explicit <Code>&lt;label for="id"&gt;</Code> association with clear label text.</Li>
			<Li>State the password rules in the hint before the person types, not only in an error afterwards.</Li>
			<Li>Do not block paste; it breaks password managers.</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="references">References</H2>
		<Ul>
			<Li><A href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete">The HTML autocomplete attribute</A> — MDN</Li>
			<Li><A href="https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html">Accessible Authentication (Minimum)</A> — W3C</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="related">Related</H2>
		<Ul>
			<Li><A href="/form/input-password">Password</A> — for signing in</Li>
			<Li><A href="/form/input-username">Username</A> — the account field that goes with it</Li>
			<Li><A href="/form/input-webauthn">WebAuthn</A> — passkeys instead of passwords</Li>
		</Ul>
	</Section>
	<Section>
		<H2 id="variables">Variables</H2>
		<Ul>
			<Li>None for input</Li>
		</Ul>
	</Section>
</LayoutTableOfContents>
