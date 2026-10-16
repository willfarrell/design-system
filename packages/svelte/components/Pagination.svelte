<script>
import A from "../elements/a.svelte";
import Li from "../elements/li.svelte";
import Nav from "../elements/nav.svelte";
import Ul from "../elements/ul.svelte";

const {
	current,
	total,
	href,
	labelPrevious = "Previous",
	labelNext = "Next",
	labelPage = "Page",
	label = "Pagination",
	...props
} = $props();

const url = (n) =>
	typeof href === "function" ? href(n) : href.replaceAll("{n}", n);

const pages = $derived(
	Array.from({ length: total }, (_, i) => i + 1)
		.filter((n) => n === 1 || n === total || Math.abs(n - current) <= 1)
		.flatMap((n, i, list) => (n - (list[i - 1] ?? n) > 1 ? [null, n] : [n])),
);
</script>

<Nav {...props} class="pagination" aria-label={label}>
  <Ul>
    {#if current > 1}
      <Li><A href={url(current - 1)} rel="prev">{labelPrevious}</A></Li>
    {/if}
    {#each pages as n}
      {#if n === null}
        <Li>…</Li>
      {:else}
        <Li><A href={url(n)} aria-current={n === current ? "page" : undefined}><span class="visually-hidden">{`${labelPage} `}</span>{n}</A></Li>
      {/if}
    {/each}
    {#if current < total}
      <Li><A href={url(current + 1)} rel="next">{labelNext}</A></Li>
    {/if}
  </Ul>
</Nav>
