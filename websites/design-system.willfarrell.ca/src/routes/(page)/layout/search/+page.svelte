<script>
import Example from "@components/Example.svelte";
import ButtonSubmit from "@design-system/components/ButtonSubmit.svelte";
import Card from "@design-system/components/Card.svelte";
import FieldLegend from "@design-system/components/FieldLegend.svelte";
import Fieldset from "@design-system/components/Fieldset.svelte";
import H1 from "@design-system/components/Heading1.svelte";
import H2 from "@design-system/components/Heading2.svelte";
import H3 from "@design-system/components/Heading3.svelte";
import H4 from "@design-system/components/Heading4.svelte";
import H5 from "@design-system/components/Heading5.svelte";
import H6 from "@design-system/components/Heading6.svelte";
import HSub from "@design-system/components/HeadingSub.svelte";
import Icon from "@design-system/components/Icon.svelte";
import Image from "@design-system/components/Image.svelte";
import InputCheckbox from "@design-system/components/InputCheckbox.svelte";
import InputSearch from "@design-system/components/InputSearch.svelte";
import InputText from "@design-system/components/InputText.svelte";
import LayoutAside from "@design-system/components/LayoutAside.svelte";
import A from "@design-system/elements/a.svelte";
import Abbr from "@design-system/elements/abbr.svelte";
import Address from "@design-system/elements/address.svelte";
import Article from "@design-system/elements/article.svelte";
import Aside from "@design-system/elements/aside.svelte";
import B from "@design-system/elements/b.svelte";
import Button from "@design-system/elements/button.svelte";
import Code from "@design-system/elements/code.svelte";
import Del from "@design-system/elements/del.svelte";
import Details from "@design-system/elements/details.svelte";
import Div from "@design-system/elements/div.svelte";
import Em from "@design-system/elements/em.svelte";
import Form from "@design-system/elements/form.svelte";
import Hgroup from "@design-system/elements/hgroup.svelte";
import I from "@design-system/elements/i.svelte";
import Ins from "@design-system/elements/ins.svelte";
import Kbd from "@design-system/elements/kbd.svelte";
import Li from "@design-system/elements/li.svelte";
import Main from "@design-system/elements/main.svelte";
import Mark from "@design-system/elements/mark.svelte";
import Nav from "@design-system/elements/nav.svelte";
import Ol from "@design-system/elements/ol.svelte";
import P from "@design-system/elements/p.svelte";
import S from "@design-system/elements/s.svelte";
import Search from "@design-system/elements/search.svelte";
import Section from "@design-system/elements/section.svelte";
import Small from "@design-system/elements/small.svelte";
import Span from "@design-system/elements/span.svelte";
import Strong from "@design-system/elements/strong.svelte";
import Sub from "@design-system/elements/sub.svelte";
import Summary from "@design-system/elements/summary.svelte";
import Sup from "@design-system/elements/sup.svelte";
import Time from "@design-system/elements/time.svelte";
import U from "@design-system/elements/u.svelte";
import Ul from "@design-system/elements/ul.svelte";
import Var from "@design-system/elements/var.svelte";

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
				<Div role="group">
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
