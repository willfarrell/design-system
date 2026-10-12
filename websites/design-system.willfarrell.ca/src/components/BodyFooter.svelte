<script>
import BodyFooter from "@willfarrell-ds/svelte/components/BodyFooter.svelte";
import H3 from "@willfarrell-ds/svelte/components/Heading3.svelte";
import Icon from "@willfarrell-ds/svelte/components/Icon.svelte";
import Image from "@willfarrell-ds/svelte/components/Image.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Address from "@willfarrell-ds/svelte/elements/address.svelte";
import Div from "@willfarrell-ds/svelte/elements/div.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Span from "@willfarrell-ds/svelte/elements/span.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
import { page } from "$app/state";

const { children } = $props();
const data = $derived.by(() => {
	try {
		return page.data;
	} catch {
		return {};
	}
});

const navLinks = {
	"Design tokens": {
		Typography: "/design-token/typography",
	},
	Components: {
		"Left To Right (LTR)": "/full-ltr",
	},
	Layouts: {
		Slices: "/layout/slices",
		Article: "/layout/article",
		Documentation: "/layout/documentation",
		Form: "/layout/form",
		Search: "/layout/search",
	},
	Support: {
		GitHub: "https://github.com/willfarrell/design-system",
	},
};
</script>

<BodyFooter navLinks={navLinks}>
    {#snippet logo()}
        <A href="/">
          <Image
            src="/img/logo.svg"
            alt="Design System logo, to the homepage"
            height="48"
            width="48"
          />
        </A>
    {/snippet}
    {#snippet address()}
        <Address>
				<P><A href="mailto:user+alias@example.org">user+alias@example.org</A></P>
				<P><A href="tel:+10000000000x000">+1-000-000-0000 x000</A></P>
				<P>Unit A, 1 Address Street, City, Region, Country, Postcode</P>
			</Address>
    {/snippet}

		<!-- <Div>
			<H3>Policies</H3>
			<Ul>
				<Li><A href="/policy/privacy">Privacy</A></Li>
				<Li><A href="/policy/accessibility">Accessibility</A></Li>
				<Li><A href="/policy/sustainability">Sustainability</A></Li>
				<Li><A href="/policy/security">Security</A></Li>
			</Ul>
		</Div> -->
</BodyFooter>
