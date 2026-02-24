<script>
// import webComponentUrl from "@design-system/component/ds-input-focus.js?url";
import BodyHeader from "@design-system/svelte/BodyHeader.svelte";
import A from "@design-system/svelte/element/a.svelte";
import Aside from "@design-system/svelte/element/aside.svelte";
import Button from "@design-system/svelte/element/button.svelte";
import Code from "@design-system/svelte/element/code.svelte";
import Div from "@design-system/svelte/element/div.svelte";
import Form from "@design-system/svelte/element/form.svelte";
import Header from "@design-system/svelte/element/header.svelte";
import Li from "@design-system/svelte/element/li.svelte";
import Search from "@design-system/svelte/element/search.svelte";
import Span from "@design-system/svelte/element/span.svelte";
import Strong from "@design-system/svelte/element/strong.svelte";
import Ul from "@design-system/svelte/element/ul.svelte";
import Icon from "@design-system/svelte/Icon.svelte";
import Image from "@design-system/svelte/Image.svelte";
import InputSearch from "@design-system/svelte/InputSearch.svelte";
import { page } from "$app/state";

const { url, params, data, form } = page;
const { locale, entity, domain, subdomain, modify } = params;

const navTopLinks = {
	[`v${data.version}`]: true,
	GitHub: `https://github.com/willfarrell/design-system`,
};

const navStartLinks = {
	Elements: "/full-ltr",
};
const navEndLinks = null; // {};
const navPrimary = null; //{};
</script>

<svelte:head>
  <!-- <script src={webComponentUrl} type="module"></script> -->
</svelte:head>

<BodyHeader {navTopLinks} {navStartLinks} {navEndLinks} {navPrimary}>
    {#snippet start()}
        <A href="/">
          <Image
            src="/img/logo.svg"
            alt="Home"
            height="31"
            width="213"
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
					<InputSearch id="q" placeholder="Search ⌘+K" size="18" is="ds-input-focus" data-keys="$mod+K" />
					<!-- <Code>&#8984;</Code><Code>K</Code> -->
					<Button><Icon src="/img/icons.svg#search" /><Span class="visually-hidden">Search</Span></Button>
				</Div>
        </Form></Search>
    {/snippet}
</BodyHeader>
