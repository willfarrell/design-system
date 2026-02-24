
<script>
import A from "@design-system/svelte/element/a.svelte";
import Aside from "@design-system/svelte/element/aside.svelte";
import Details from "@design-system/svelte/element/details.svelte";
import Div from "@design-system/svelte/element/div.svelte";
import Header from "@design-system/svelte/element/header.svelte";
import Li from "@design-system/svelte/element/li.svelte";
import Nav from "@design-system/svelte/element/nav.svelte";
import Strong from "@design-system/svelte/element/strong.svelte";
import Summary from "@design-system/svelte/element/summary.svelte";
import Ul from "@design-system/svelte/element/ul.svelte";
import Image from "@design-system/svelte/Image.svelte";

import { page } from "$app/state";

const {
	children,
	labelMenuTop = "Top menu",
	labelSkip = "Skip to main content",
	labelMenuMain = "Main menu",
	navTopLinks,
	start,
	navStartLinks,
	navEndLinks,
	end,
} = $props();
const { url, params, data, form } = page;
</script>

{#snippet links(nav)}
  <Ul>
    {#each Object.keys(nav) as key, idx}
      {#if nav[key]}
        <Li>
          {#if nav[key] === true}
            <Strong>{key}</Strong>
          {:else if typeof nav[key] === "string"}
            <A href={nav[key]}>{key}</A>
          {:else}
            <!-- TODO replace with popover -->
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

<Header>
  <Aside>
    <Nav aria-label={labelMenuTop}>
      <A href="#main" class="skip">{labelSkip}</A>
      {#if navTopLinks}
        {@render links(navTopLinks)}
      {/if}
    </Nav>
  </Aside>
  <Nav aria-label={labelMenuMain}>
    <Div>
      {@render start?.()}
      {#if navStartLinks}
        {@render links(navStartLinks)}
      {/if}
    </Div>
    <Div>
      {#if navEndLinks}
        {@render links(navEndLinks)}
      {/if}
      {@render end?.()}
    </Div>
  </Nav>
  {@render children?.()}
</Header>

<style>
  :global {
    /*:root{
            --sticky-header-height: calc(2 * 0.5em + 1em + 2 * 0.5em + 2 * var(--padding-fixed) * 0.54 + 1em + 1.5em);
        }*/
    body > header {
      /*position: sticky;
            top: 0;
            z-index: 1;*/

      /* Ref: https://www.joshwcomeau.com/css/backdrop-filter/ */
      backdrop-filter: blur(16px);
      background: linear-gradient(to bottom, var(--color-l0), transparent 50%);

      nav {
        display: flex;
        gap: 1em;
        /* aside + main + scrollspy */
        padding: 0.5em var(--padding-page-inline);
        border-block-end: solid #555 1px;

        :nth-child(2) > :first-child {
          margin-inline-start: auto;
        }

        div {
          display: flex;
          flex: 1 1 0%;
          gap: 1em;
        }

        div > ul {
          container-type: unset;
          flex: 0 1 0%;
        }

        ul {
          container-type: inline-size;
          display: flex;
          flex: 1 1 0%;
          gap: 1em;
        }

        li {
          align-self: anchor-center;
        }

        @container (inline-size < 40ch) {
          li {
            display: none;
            background: #f00;
          }
        }
      }
    }
  }
</style>
