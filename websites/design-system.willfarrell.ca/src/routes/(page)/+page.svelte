<script>
import Head from "@components/Head.svelte";
import Codeblock from "@design-system/svelte/Codeblock.svelte";
import A from "@design-system/svelte/element/a.svelte";
import Article from "@design-system/svelte/element/article.svelte";
import Div from "@design-system/svelte/element/div.svelte";
import Em from "@design-system/svelte/element/em.svelte";
import Hgroup from "@design-system/svelte/element/hgroup.svelte";
import Li from "@design-system/svelte/element/li.svelte";
import P from "@design-system/svelte/element/p.svelte";
import Section from "@design-system/svelte/element/section.svelte";
import Span from "@design-system/svelte/element/span.svelte";
import Ul from "@design-system/svelte/element/ul.svelte";
import H1 from "@design-system/svelte/Heading1.svelte";
import H2 from "@design-system/svelte/Heading2.svelte";
import H3 from "@design-system/svelte/Heading3.svelte";
import HSub from "@design-system/svelte/HeadingSub.svelte";
import Icon from "@design-system/svelte/Icon.svelte";
import Image from "@design-system/svelte/Image.svelte";
import LayoutCenter from "@design-system/svelte/LayoutCenter.svelte";
import LayoutSlices from "@design-system/svelte/LayoutSlices.svelte";
</script>

<Head>
	<title>Design System</title>
	<meta name="description" content="A sematic fluid design system" />
</Head>

<LayoutSlices>
    <Section class="slice hero vertical">
        <Div class="inline-center">
            <H1>design system</H1>

            <P
                >Sematic fluid design</P
            >
            <Div role="group">
                <P>
                    <A href="/docs" class="button"
                        ><Span>Get started</Span>
                        <Icon src="/img/icons.svg#arrow-inline-end" /></A
                    ></P
                ></Div
            >
            <!--<H2 class="visually-hidden">Build for performance</H2>
            <Ul class="grid">
                <Li class="stat">
                    <H3
                        ><Icon src="/img/icons.svg#star" />
                        <Span>0.5 - 5KB</Span></H3
                    >
                    <P>Small bundle</P>
                </Li>
                <Li class="stat">
                    <H3
                        ><Icon src="/img/icons.svg#download" />
                        <Span>2M+</Span></H3
                    >
                    <P>Monthly downloads</P>
                </Li>
                <Li class="stat">
                    <H3
                        ><Icon src="/img/icons.svg#users" />
                        <Span>200+</Span></H3
                    >
                    <P>Contributors</P>
                </Li>
            </Ul>-->
        </Div>
    </Section>
    <Section class="slice grid">
        <Div class="inline-center">
            <H2>Core value baked in from the begining.</H2>
        </Div>
        <Ul class="grid">
            <Li class="feature">
                <Icon
                    src="/img/icons.svg#privacy"
                    alt=""
                />
                <H3>Privacy</H3>
                <P
                    >Only use Same-Origin assets. No 3rd party CDN snooping.</P
                >
            </Li>
            <Li class="feature">
                <Icon
                    src="/img/icons.svg#accessibility"
                    alt=""
                />
                <H3>Accessibility</H3>
                <P
                    >WCAG 2.2 AAA, internationalization (i18n), localization (l10n), performant.</P
                >
            </Li>
            <Li class="feature">
                <Icon
                    src="/img/icons.svg#sustainability"
                    alt=""
                />
                <H3>Sustainability</H3>
                <P
                    >WSG <Em>Draft</Em>. Only send what you need, when you need it. Progressive enhancement when JavaScript is availible.</P
                >
            </Li>
            <Li class="feature">
                <Icon
                    src="/img/icons.svg#security"
                    alt=""
                />
                <H3>Security</H3>
                <P>OWASP Best Practices, ASVS v5 Level 3, TrustedTypes</P
                >
            </Li>
        </Ul>
    </Section>
    <Section class="slice vertical">
        <Div class="inline-center">
            <H2>Gettings started</H2>
			<H3>Install</H3>
			<Codeblock language="sh" code={'npm i @design-system/style'} />

			<H3>Import</H3>
			<Codeblock language="css" code={'import @design-system/style/all.css'} />
        </Div>
    </Section>
</LayoutSlices>
<LayoutCenter>
	<Article>
		<Hgroup>
			<H1>design system</H1>
			<HSub>Sematic fluid design</HSub>
		</Hgroup>
		<P>TL;DR Private, Accisible, Sustanable, Secure</P>
		<Section>
			<H2>Features</H2>
			<Ul>
				<Li>Sematic HTML</Li>
				<Li>classless first</Li>
				<Li>Start with as little as 0.5 KB, up to 5 KB</Li>
				<Li>Framework agnostic</Li>
				<Li>Built to meet WCAG 2.2 AAA, WCAG 3 for colors</Li>
				<Li>Right to left support</Li>
				<Li>Light and dark mode with all the prefers @media queries</Li>
				<Li>Progressive enhancement though lazy loaded customElements</Li>
			</Ul>
		</Section>
		<Section>
			<H2>Values</H2>
			<H3>Privacy</H3>
			<P
				>- Only collect what you need, when you need it - Encrypt in transit / Encrypt in use /
				Encrypt at rest - EFF DNT</P
			>
			<H3>Accessibility</H3>
			<P
				>- WCAG 2.2 AAA / WCAG 3 - rtl lang support (link) - vertical lang support (link) - date
				formatting</P
			>
			<P>- number formatting</P>
			<H3>Sustainability</H3>
			<P>- WSG Draft - Only ship what you need, when you need it</P>
			<H3>Security</H3>
			<P>- OWASP Best practice - ASVS L3 - CSP - TrustedTypes</P>
		</Section>
		<Section>
			<H2>Gettings started</H2>
			<H3>Install</H3>
			<Codeblock language="sh" code={'npm i @design-system/style'} />

			<H3>Import</H3>
			<Codeblock language="css" code={'import @design-system/style/all.css'} />

			<H3>Add into your HTML</H3>
		</Section>
		<Section>
			<H2>CSS rules</H2>
			<Ul>
				<Li
					>Use `start` and `end` over `top`, `right`, `bottom`, `left`
					(https://rtlstyling.com/posts/rtl-styling/#logical-properties-cheat-sheet)</Li
				>
				<Li>don't use `opacity`, will be removed with `prefers-reduced-transparency`</Li>
				<Li
					>don't use `box-shadow` or `text-shadow`, will be removed with `forced-colors` and
					`inverted-colors`</Li
				>
			</Ul>
		</Section>
	</Article>
</LayoutCenter>
