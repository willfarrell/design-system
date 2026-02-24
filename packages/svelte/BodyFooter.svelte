<script>
import ButtonSubmit from "@design-system/svelte/ButtonSubmit.svelte";
import A from "@design-system/svelte/element/a.svelte";
import Button from "@design-system/svelte/element/button.svelte";
import Details from "@design-system/svelte/element/details.svelte";
import Div from "@design-system/svelte/element/div.svelte";
import Footer from "@design-system/svelte/element/footer.svelte";
import Form from "@design-system/svelte/element/form.svelte";
import I from "@design-system/svelte/element/i.svelte";
import Li from "@design-system/svelte/element/li.svelte";
import Nav from "@design-system/svelte/element/nav.svelte";
import Option from "@design-system/svelte/element/option.svelte";
import Search from "@design-system/svelte/element/search.svelte";
import Select from "@design-system/svelte/element/select.svelte";
import Span from "@design-system/svelte/element/span.svelte";
import Strong from "@design-system/svelte/element/strong.svelte";
import Summary from "@design-system/svelte/element/summary.svelte";
import Ul from "@design-system/svelte/element/ul.svelte";
import Fieldset from "@design-system/svelte/Fieldset.svelte";
import H2 from "@design-system/svelte/Heading2.svelte";
import H3 from "@design-system/svelte/Heading3.svelte";
import Icon from "@design-system/svelte/Icon.svelte";
import Image from "@design-system/svelte/Image.svelte";
import InputRadio from "@design-system/svelte/InputRadio.svelte";
import InputTextarea from "@design-system/svelte/InputTextarea.svelte";

import { page } from "$app/state";

const { logo, address, children, navLinks } = $props();
const { url, params, data, form } = page;
const { locale, entity, modify } = params;

const { changes, records } = data;
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
  <H2 class="visually-hidden">Footer</H2>

  <Nav class="grid">
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
      min-height: 100vh;

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
