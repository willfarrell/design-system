<script>
import A from "@design-system/svelte/element/a.svelte";
import Details from "@design-system/svelte/element/details.svelte";
import Hr from "@design-system/svelte/element/hr.svelte";
import Li from "@design-system/svelte/element/li.svelte";
import Nav from "@design-system/svelte/element/nav.svelte";
import Strong from "@design-system/svelte/element/strong.svelte";
import Summary from "@design-system/svelte/element/summary.svelte";
import Ul from "@design-system/svelte/element/ul.svelte";
import { page } from "$app/state";

const { children, top, nav } = $props();
const { url } = page;

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
