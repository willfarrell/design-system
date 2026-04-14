
<script>
import { page } from "$app/state";
import A from "../elements/a.svelte";
import Aside from "../elements/aside.svelte";
import Details from "../elements/details.svelte";
import Div from "../elements/div.svelte";
import Header from "../elements/header.svelte";
import Li from "../elements/li.svelte";
import Nav from "../elements/nav.svelte";
import Strong from "../elements/strong.svelte";
import Summary from "../elements/summary.svelte";
import Ul from "../elements/ul.svelte";
import Image from "./Image.svelte";

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
const url = $derived.by(() => {
	try {
		return page.url;
	} catch {
		return { pathname: "", hash: "" };
	}
});
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
                inset-block-start: 0;
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
              min-inline-size: 0;
            }

            search, search form, search [role="group"] {
              min-inline-size: 0;
            }

            search input {
              min-inline-size: 0;
              inline-size: 100%;
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
