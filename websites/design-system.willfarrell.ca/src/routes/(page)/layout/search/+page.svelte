<script>
import ButtonSubmit from "@willfarrell-ds/svelte/components/ButtonSubmit.svelte";
import Card from "@willfarrell-ds/svelte/components/Card.svelte";
import FieldLegend from "@willfarrell-ds/svelte/components/FieldLegend.svelte";
import Fieldset from "@willfarrell-ds/svelte/components/Fieldset.svelte";
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import H2 from "@willfarrell-ds/svelte/components/Heading2.svelte";
import H3 from "@willfarrell-ds/svelte/components/Heading3.svelte";
import H4 from "@willfarrell-ds/svelte/components/Heading4.svelte";
import H5 from "@willfarrell-ds/svelte/components/Heading5.svelte";
import H6 from "@willfarrell-ds/svelte/components/Heading6.svelte";
import HSub from "@willfarrell-ds/svelte/components/HeadingSub.svelte";
import Icon from "@willfarrell-ds/svelte/components/Icon.svelte";
import Image from "@willfarrell-ds/svelte/components/Image.svelte";
import InputCheckbox from "@willfarrell-ds/svelte/components/InputCheckbox.svelte";
import InputSearch from "@willfarrell-ds/svelte/components/InputSearch.svelte";
import InputText from "@willfarrell-ds/svelte/components/InputText.svelte";
import LayoutAside from "@willfarrell-ds/svelte/components/LayoutAside.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Abbr from "@willfarrell-ds/svelte/elements/abbr.svelte";
import Address from "@willfarrell-ds/svelte/elements/address.svelte";
import Article from "@willfarrell-ds/svelte/elements/article.svelte";
import Aside from "@willfarrell-ds/svelte/elements/aside.svelte";
import B from "@willfarrell-ds/svelte/elements/b.svelte";
import Button from "@willfarrell-ds/svelte/elements/button.svelte";
import Code from "@willfarrell-ds/svelte/elements/code.svelte";
import Del from "@willfarrell-ds/svelte/elements/del.svelte";
import Details from "@willfarrell-ds/svelte/elements/details.svelte";
import Div from "@willfarrell-ds/svelte/elements/div.svelte";
import Em from "@willfarrell-ds/svelte/elements/em.svelte";
import Form from "@willfarrell-ds/svelte/elements/form.svelte";
import Hgroup from "@willfarrell-ds/svelte/elements/hgroup.svelte";
import I from "@willfarrell-ds/svelte/elements/i.svelte";
import Ins from "@willfarrell-ds/svelte/elements/ins.svelte";
import Kbd from "@willfarrell-ds/svelte/elements/kbd.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import Main from "@willfarrell-ds/svelte/elements/main.svelte";
import Mark from "@willfarrell-ds/svelte/elements/mark.svelte";
import Nav from "@willfarrell-ds/svelte/elements/nav.svelte";
import Ol from "@willfarrell-ds/svelte/elements/ol.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import S from "@willfarrell-ds/svelte/elements/s.svelte";
import Search from "@willfarrell-ds/svelte/elements/search.svelte";
import Section from "@willfarrell-ds/svelte/elements/section.svelte";
import Small from "@willfarrell-ds/svelte/elements/small.svelte";
import Span from "@willfarrell-ds/svelte/elements/span.svelte";
import Strong from "@willfarrell-ds/svelte/elements/strong.svelte";
import Sub from "@willfarrell-ds/svelte/elements/sub.svelte";
import Summary from "@willfarrell-ds/svelte/elements/summary.svelte";
import Sup from "@willfarrell-ds/svelte/elements/sup.svelte";
import Time from "@willfarrell-ds/svelte/elements/time.svelte";
import U from "@willfarrell-ds/svelte/elements/u.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
import Var from "@willfarrell-ds/svelte/elements/var.svelte";
import Example from "#components/Example.svelte";

const results = new Array(24).fill("x").map((x, i) => {
	return {
		id: `${i}`,
		href: "#",
		title: `Card title ${i}`,
		description: "Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur",
		button: "Read more",
		img: {
			src: "/img/placeholder/16_9.320x179.png",
		},
	};
});
</script>

<svelte:head>
	<title>Search | Layout | Design System</title>
	<meta name="description" content="A semantic fluid design system" />
</svelte:head>

<LayoutAside>
	{#snippet aside()}
		<Search>
			<Form method="GET">
				<Div class="group">
					<InputSearch id="q" label="Search" size="18" />
					<Button
						><Icon src="/img/icons.svg#search" /><Span class="visually-hidden">Search</Span></Button
					>
				</Div>
				<Button><Span inert>&times;&nbsp;</Span>Clear all</Button>
				<Fieldset id="a" name="a" label="Filter" value="">
					<InputCheckbox label="Item 1" value="1" />
					<InputCheckbox label="Item 2" value="2" />
					<InputCheckbox label="Item 3" value="3" />
					<InputCheckbox label="Item 4" value="4" />
				</Fieldset>
				<Fieldset id="b" name="b" value="">
					<Details open class="chevron">
						<Summary><FieldLegend legend="Filter collapse" /></Summary>
						<InputCheckbox label="Item 1" value="1" />
						<InputCheckbox label="Item 2" value="2" />
						<InputCheckbox label="Item 3" value="3" />
						<InputCheckbox label="Item 4" value="4" />
					</Details>
				</Fieldset>
				<ButtonSubmit>Apply</ButtonSubmit>
				<P>Need help? <A href="/docs" target="_top">View our guidance</A></P>
			</Form>
		</Search>
	{/snippet}
	<Main class="container-results" id="main">
		<Section>
			<Hgroup>
				<H1>Results</H1>
				<HSub>number of results, list filters</HSub>
			</Hgroup>
			<!-- TODO filter summary -->
			<!--<Details open>
				<Summary>Filters</Summary>
				<Button props={{background_color:"white"}} type="reset">{t("form-reset")}</Button>
			  </Details>-->
			<Ul class="grid">
				{#each results as card}
					<Li><Card id={card.id}>
						<H2><A href={card.href} aria-describedby={card.id}>{card.title}</A></H2>
						{#if card.description}
							<P>{card.description}</P>
						{/if}
						{#if card.button}
							<Span aria-hidden="true" id={card.id}>{card.button}</Span>
						{/if}
						{#snippet img()}
							<Image {...card.img} />
						{/snippet}
					</Card></Li>
				{/each}
			</Ul>
		</Section>
	</Main>
</LayoutAside>

<style global>
	.container-results {
				max-inline-size: 60em;
				inline-size: 100%;

				.grid {
					--grid-gap: 1em;
					--grid-min-width: 30ch;
				}
			}
</style>
