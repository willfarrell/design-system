<script>
import Codeblock from "@design-system/components/Codeblock.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import H3 from "@design-system/components/Heading3.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import Icon from "@design-system/components/Icon.svelte";
import Image from "@design-system/components/Image.svelte";
import LayoutCenter from "@design-system/components/LayoutCenter.svelte";
import LayoutSlices from "@design-system/components/LayoutSlices.svelte";
import A from "@design-system/elements/a.svelte";
import Article from "@design-system/elements/article.svelte";
import Div from "@design-system/elements/div.svelte";
import Em from "@design-system/elements/em.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import Li from "@design-system/elements/li.svelte";
import P from "@design-system/elements/p.svelte";
import Section from "@design-system/elements/section.svelte";
import Span from "@design-system/elements/span.svelte";
import Ul from "@design-system/elements/ul.svelte";
</script>

<svelte:head>
	<title>Design System</title>
	<meta name="description" content="A semantic fluid design system" />
</svelte:head>

<LayoutSlices>
    <Section class="slice hero vertical">
        <Div class="inline-center">
            <Image
              src="/img/logo.svg"
              alt="Design System logo"
              height="96"
              width="96"
              decoding="auto"
              fetchpriority="high"
              loading="eager"
            />
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
    <Section class="slice vertical">
        <Div class="inline-center">
            <H2>Features</H2>
        </Div>
        <Ul class="grid">
            <Li class="card feature">
                <H3>Semantic HTML</H3>
                <P>Classless first approach built on native HTML elements and CSS custom properties.</P>
            </Li>
            <Li class="card feature">
                <H3>Tiny Footprint</H3>
                <P>Start with as little as 0.5 KB, up to 5 KB. Only ship what you need.</P>
            </Li>
            <Li class="card feature">
                <H3>Framework Agnostic</H3>
                <P>Works with any framework or none at all. Vanilla CSS and optional Svelte components.</P>
            </Li>
            <Li class="card feature">
                <H3>Right to Left</H3>
                <P>Full bidirectional support with CSS logical properties for RTL and vertical languages.</P>
            </Li>
            <Li class="card feature">
                <H3>Light &amp; Dark Mode</H3>
                <P>Automatic theme switching with support for all <Em>prefers-*</Em> media queries.</P>
            </Li>
            <Li class="card feature">
                <H3>Progressive Enhancement</H3>
                <P>Works without JavaScript. Lazy loaded customElements enhance when available.</P>
            </Li>
        </Ul>
    </Section>
    <Section class="slice vertical">
        <Div class="inline-center">
            <H2>Getting started</H2>
			<H3>Install</H3>
			<Codeblock language="sh" code={'npm i @willfarrell-ds/vanilla'} />

			<H3>Import</H3>
			<Codeblock language="css" code={'import "@willfarrell-ds/vanilla/all.css"'} />
        </Div>
    </Section>

    <Section class="slice grid">
        <Div class="inline-center">
            <H2>Core value baked in from the beginning.</H2>
        </Div>
        <Ul class="grid">
            <Li class="card feature">
                <Icon
                    src="/img/icons.svg#privacy"
                    alt=""
                />
                <H3>Privacy</H3>
                <P
                    >Only use Same-Origin assets. No 3rd party CDN snooping.</P
                >
            </Li>
            <Li class="card feature">
                <Icon
                    src="/img/icons.svg#accessibility"
                    alt=""
                />
                <H3>Accessibility</H3>
                <P
                    >WCAG 2.2 AAA, internationalization (i18n), localization (l10n), performant.</P
                >
            </Li>
            <Li class="card feature">
                <Icon
                    src="/img/icons.svg#sustainability"
                    alt=""
                />
                <H3>Sustainability</H3>
                <P
                    >WSG <Em>Draft</Em>. Only send what you need, when you need it. Progressively Enhanced WebComponents (PEWC) when JavaScript is available.</P
                >
            </Li>
            <Li class="card feature">
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
            <P>
                <A href="https://github.com/sponsors/willfarrell" class="button"
                    ><Icon src="/img/icons.svg#heart" /><Span
                        >Become a sponsor</Span
                    >
                </A></P
            >
        </Div>
    </Section>
</LayoutSlices>
