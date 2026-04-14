<script>
import { page } from "$app/state";
import A from "../elements/a.svelte";
import Details from "../elements/details.svelte";
import Hr from "../elements/hr.svelte";
import Li from "../elements/li.svelte";
import Nav from "../elements/nav.svelte";
import Strong from "../elements/strong.svelte";
import Summary from "../elements/summary.svelte";
import Ul from "../elements/ul.svelte";

const { children, top, nav } = $props();
const url = $derived.by(() => {
	try {
		return page.url;
	} catch {
		return { pathname: "", hash: "" };
	}
});

/*

	// Expected `nav` structure
	{
		'Group name':true,
		'Link name':'/path/to/page'
		'Summary name':{
			'Link name':'/path/to/page',
			'Link name':'/path/to/page'
		}
	}

	*/
</script>

{#snippet links(nav)}
  <Ul>
    {#each Object.keys(nav) as key, idx}
      {#if nav[key]}
        <Li>
          {#if nav[key] === true}
            {#if idx !== 0}
              <Hr />
            {/if}
            <Strong>{key}</Strong>
          {:else if typeof nav[key] === "string"}
            <A href={nav[key]}>{key}</A>
          {:else}
            <Details
              class="chevron"
              open={Object.values(nav[key]).includes(url.pathname)}
            >
              <Summary><Strong>{key}</Strong></Summary>
              {@render links(nav[key])}
            </Details>
          {/if}
        </Li>
      {/if}
    {/each}
  </Ul>
{/snippet}

<Nav>
  {@render top?.()}
  {@render links(nav)}
  {@render children?.()}
</Nav>
