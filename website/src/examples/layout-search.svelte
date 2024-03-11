<script>
	import LayoutAside from '@design-system/svelte/LayoutAside.svelte';
	import Example from '@components/Example.svelte';

	import Aside from '@design-system/svelte/element/aside.svelte';
	import Search from '@design-system/svelte/element/search.svelte';
	import Form from '@design-system/svelte/element/form.svelte';
	import InputSearch from '@design-system/svelte/InputSearch.svelte';
	import Fieldset from '@design-system/svelte/Fieldset.svelte';
	import FieldLegend from '@design-system/svelte/FieldLegend.svelte';
	import InputCheckbox from '@design-system/svelte/InputCheckbox.svelte';
	import Button from '@design-system/svelte/element/button.svelte';
	import Icon from '@design-system/svelte/Icon.svelte';

	import Details from '@design-system/svelte/element/details.svelte';
	import Summary from '@design-system/svelte/element/summary.svelte';

	import Div from '@design-system/svelte/element/div.svelte';
	import A from '@design-system/svelte/element/a.svelte';
	import InputText from '@design-system/svelte/InputText.svelte';

	import Nav from '@design-system/svelte/element/nav.svelte';
	import Main from '@design-system/svelte/element/main.svelte';
	import Article from '@design-system/svelte/element/article.svelte';
	import Section from '@design-system/svelte/element/section.svelte';
	import Hgroup from '@design-system/svelte/element/hgroup.svelte';
	import H1 from '@design-system/svelte/Heading1.svelte';
	import HSub from '@design-system/svelte/HeadingSub.svelte';
	import Time from '@design-system/svelte/element/time.svelte';
	import H2 from '@design-system/svelte/Heading2.svelte';
	import H3 from '@design-system/svelte/Heading3.svelte';
	import H4 from '@design-system/svelte/Heading4.svelte';
	import H5 from '@design-system/svelte/Heading5.svelte';
	import H6 from '@design-system/svelte/Heading6.svelte';
	import P from '@design-system/svelte/element/p.svelte';
	import Abbr from '@design-system/svelte/element/abbr.svelte';
	import Address from '@design-system/svelte/element/address.svelte';
	import B from '@design-system/svelte/element/b.svelte';
	import Strong from '@design-system/svelte/element/strong.svelte';
	import Em from '@design-system/svelte/element/em.svelte';
	import I from '@design-system/svelte/element/i.svelte';
	import Del from '@design-system/svelte/element/del.svelte';
	import Ins from '@design-system/svelte/element/ins.svelte';
	import Code from '@design-system/svelte/element/code.svelte';
	import Kbd from '@design-system/svelte/element/kbd.svelte';
	import Mark from '@design-system/svelte/element/mark.svelte';
	import S from '@design-system/svelte/element/s.svelte';
	import Small from '@design-system/svelte/element/small.svelte';
	import Span from '@design-system/svelte/element/span.svelte';
	import Sub from '@design-system/svelte/element/sub.svelte';
	import Sup from '@design-system/svelte/element/sup.svelte';
	import U from '@design-system/svelte/element/u.svelte';
	import Var from '@design-system/svelte/element/var.svelte';
	import Ul from '@design-system/svelte/element/ul.svelte';
	import Ol from '@design-system/svelte/element/ol.svelte';
	import Li from '@design-system/svelte/element/li.svelte';
	import Img from '@design-system/svelte/element/img.svelte';
	import Card from '@design-system/svelte/Card.svelte';

	import PageHeader from '@components/Header.svelte';
	import PageFooter from '@components/Footer.svelte';

	const results = new Array(25).map((x, i) => {
		return {
			id: i,
			href: '#',
			title: 'Card title',
			description: 'Commodo ut laborum fugiat aliqua eiusmod voluptate pariatur',
			img: {
				src: '/img/16_9.320x179.png'
			}
		};
	});
</script>

<LayoutAside>
	<!-- TODO collapse for mobile -->
	<Search slot="nav">
		<Form method="GET">
			<Div role="group">
				<InputSearch id="q" label="Search" size="10" />
				<Button><Icon src="/img/icons.svg#search" /></Button>
			</Div>
			<Button><Span inert>&times;</Span>&nbsp;Clear all</Button>
			<Fieldset id="a" label="Filter" value="">
				<InputCheckbox label="Item 1" value="1" />
				<InputCheckbox label="Item 2" value="2" />
				<InputCheckbox label="Item 3" value="3" />
				<InputCheckbox label="Item 4" value="4" />
			</Fieldset>
			<Fieldset id="b" value="">
				<Details open>
					<Summary><FieldLegend>Filter collapse</FieldLegend></Summary>
					<InputCheckbox label="Item 1" value="1" />
					<InputCheckbox label="Item 2" value="2" />
					<InputCheckbox label="Item 3" value="3" />
					<InputCheckbox label="Item 4" value="4" />
				</Details>
			</Fieldset>
			<Button>Apply</Button>
		</Form>
	</Search>
	<Main>
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
				<Example component="card" {card} />
			{/each}
		</Ul>
	</Main>
</LayoutAside>
