<script>
import BodyHeader from "@design-system/components/BodyHeader.svelte";
import Icon from "@design-system/components/Icon.svelte";
import Image from "@design-system/components/Image.svelte";
import InputSearch from "@design-system/components/InputSearch.svelte";
import A from "@design-system/elements/a.svelte";
import Aside from "@design-system/elements/aside.svelte";
import Button from "@design-system/elements/button.svelte";
import Code from "@design-system/elements/code.svelte";
import Div from "@design-system/elements/div.svelte";
import Form from "@design-system/elements/form.svelte";
import Header from "@design-system/elements/header.svelte";
import Li from "@design-system/elements/li.svelte";
import Search from "@design-system/elements/search.svelte";
import Span from "@design-system/elements/span.svelte";
import Strong from "@design-system/elements/strong.svelte";
import Ul from "@design-system/elements/ul.svelte";
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-input-focus.js?worker&url";
import { page } from "$app/state";

const data = $derived.by(() => {
	try { return page.data; } catch { return {}; }
});

const navTopLinks = $derived.by(() => ({
	[`v${data.version}`]: true,
	GitHub: `https://github.com/willfarrell/design-system`,
}));

const navStartLinks = {
	Documentation: "/docs",
	Preview: "/full-ltr",
};
const navEndLinks = null; // {};
const navPrimary = null; //{};
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<BodyHeader {navTopLinks} {navStartLinks} {navEndLinks} {navPrimary}>
    {#snippet start()}
        <A href="/">
          <Image
            src="/img/logo.svg"
            alt="Design System logo, to the homepage"
            height="48"
            width="48"
            decoding="auto"
            fetchpriority="high"
            loading="eager"
          />
        </A>
    {/snippet}
    {#snippet end()}
        <Search>
        <Form method="GET" action="/search">
           	<Div role="group">
					<InputSearch id="q" aria-label="Search" placeholder="Search ⌘+K" size="18" is="ds-input-focus" data-keys="$mod+K" />
					<!-- <Code>&#8984;</Code><Code>K</Code> -->
					<Button type="submit"><Icon src="/img/icons.svg#search" /><Span class="visually-hidden">Search</Span></Button>
				</Div>
        </Form></Search>
    {/snippet}
</BodyHeader>
