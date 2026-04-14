<script>
import { page } from "$app/state";
import A from "../elements/a.svelte";
import Details from "../elements/details.svelte";
import Div from "../elements/div.svelte";
import Footer from "../elements/footer.svelte";
import Li from "../elements/li.svelte";
import Nav from "../elements/nav.svelte";
import Strong from "../elements/strong.svelte";
import Summary from "../elements/summary.svelte";
import Ul from "../elements/ul.svelte";
import H2 from "./Heading2.svelte";

const { logo, address, children, navLinks, labelHeader = "Footer" } = $props();
const url = $derived.by(() => {
	try {
		return page.url;
	} catch {
		return { pathname: "", hash: "" };
	}
});
const params = $derived.by(() => {
	try {
		return page.params;
	} catch {
		return {};
	}
});
const data = $derived.by(() => {
	try {
		return page.data;
	} catch {
		return {};
	}
});
const locale = $derived(params?.locale);
const entity = $derived(params?.entity);
const modify = $derived(params?.modify);
const changes = $derived(data?.changes);
const records = $derived(data?.records);
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

{#snippet columns(nav)}
  {#each Object.keys(nav) as key, idx}
    {#if typeof nav[key] === "object"}
      <Div>
        <Strong>{key}</Strong>
        {@render links(nav[key])}
      </Div>
    {/if}
  {/each}
{/snippet}

<Footer id="footer">
  <H2 id="nav-footer-label" class="visually-hidden">{labelHeader}</H2>

  <Nav class="grid" aria-labelledby="nav-footer-label">
    <Div>
      <Ul>
          {#if logo}
            <Li>
              {@render logo?.()}
            </Li>
          {/if}
          {#if address}
            <Li>
              {@render address?.()}
            </Li>
          {/if}
      </Ul>
    </Div>
    {@render columns(navLinks)}
    {#if children}
        {@render children?.()}
    {/if}
  </Nav>
</Footer>

<style>
  :global {
        body {
          display: flex;
          flex-direction: column;
          min-block-size: 100vh;

          & > div {
            flex: 1 0 auto;
          }

          & > footer {
            display: flex;
            gap: 1em;
            /* aside + main + scrollspy */
            padding: 0.5em var(--padding-page-inline);
            border-block-start: solid #555 1px;

            &.grid {
              --grid-gap: 1.5em;
              --grid-min-width: 20ch;
            }
          }
        }
      }
</style>
