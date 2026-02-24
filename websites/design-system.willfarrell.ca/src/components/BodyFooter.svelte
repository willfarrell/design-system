<script>
import BodyFooter from "@design-system/svelte/BodyFooter.svelte";
import A from "@design-system/svelte/element/a.svelte";
import Address from "@design-system/svelte/element/address.svelte";
import Div from "@design-system/svelte/element/div.svelte";
import Li from "@design-system/svelte/element/li.svelte";
import P from "@design-system/svelte/element/p.svelte";
import Span from "@design-system/svelte/element/span.svelte";
import Ul from "@design-system/svelte/element/ul.svelte";
import H3 from "@design-system/svelte/Heading3.svelte";
import Icon from "@design-system/svelte/Icon.svelte";
import Image from "@design-system/svelte/Image.svelte";

import { page } from "$app/state";

const { children } = $props();
const { url, params, data, form } = page;

const navLinks = {
	"Design tokens": {
		Typography: "/design-token/typography",
	},
	Components: {
		"Left To Right (LTR)": "/full-ltr",
		"Right To Left (RTL)": "/full-rtl",
		"Vertical Right to Left (VRL)": "/full-vrl",
		"Vertical Left to Right (VLR)": "/full-vlr",
	},
	Layouts: {
		Slices: "/layout/slices",
		Article: "/layout/article",
		Documentation: "/layout/documentation",
		Form: "/layout/form",
		Search: "/layout/search",
	},
};
</script>

<BodyFooter navLinks={navLinks}>
    {#snippet logo()}
        <A href="/">
          <Image
            src="/img/logo-square.svg"
            alt="Home"
            height="68"
            width="105"
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

        <Div>
			<H3>Social</H3>
			<Ul>
				<Li>
					<A href="https://github.com/willfarrell/design-system">
						<Icon src="/img/icons.svg#github" alt="" /><Span>GitHub</Span>
					</A>
				</Li>
			</Ul>
        </Div>
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
