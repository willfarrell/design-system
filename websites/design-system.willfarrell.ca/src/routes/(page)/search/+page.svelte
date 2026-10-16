<script>
import H1 from "@willfarrell-ds/svelte/components/Heading1.svelte";
import LayoutCenter from "@willfarrell-ds/svelte/components/LayoutCenter.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import Article from "@willfarrell-ds/svelte/elements/article.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";

const { data } = $props();
</script>

<svelte:head>
	<title>Search | Design System</title>
	<meta name="description" content="Search the design system pages" />
</svelte:head>

<LayoutCenter>
	<Article>
		<H1>Search</H1>
		{#if !data.q}
			<P>Enter a search term.</P>
		{:else if data.results.length}
			<P>{data.results.length} results for “{data.q}”</P>
			<Ul>
				{#each data.results as loc (loc)}
					<Li><A href={loc}>{loc}</A></Li>
				{/each}
			</Ul>
		{:else}
			<P>No results for “{data.q}”</P>
		{/if}
	</Article>
</LayoutCenter>
