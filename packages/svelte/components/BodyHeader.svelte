<script>
import { page } from "$app/state";
import A from "../elements/a.svelte";
import Aside from "../elements/aside.svelte";
import Button from "../elements/button.svelte";
import Details from "../elements/details.svelte";
import Div from "../elements/div.svelte";
import Header from "../elements/header.svelte";
import Li from "../elements/li.svelte";
import Nav from "../elements/nav.svelte";
import Span from "../elements/span.svelte";
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
            <!-- exact match → a.svelte sets aria-current="page"; subpath → section -->
            <A
              href={nav[key]}
              aria-current={url.pathname.startsWith(`${nav[key]}/`)
                ? "true"
                : undefined}>{key}</A
            >
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
    {@render start?.()}
    <Button class="hamburger" popovertarget="nav-menu-main">
      <Span class="visually-hidden">{labelMenuMain}</Span>
    </Button>
    <Div id="nav-menu-main" popover="auto">
      <Div>
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
    </Div>
  </Nav>
  {@render children?.()}
</Header>

<style>
  :global {
    /* Hidey-bar pattern: relative ot sticky header */
    html {
        container-type: scroll-state;
        /* WCAG 2.4.12 Focus Not Obscured (Enhanced): keep tabbed-to
           targets clear of the sticky header */
        /* exact, not measured: the nav rows enforce these block-sizes
           below; each row = content + 0.5em padding ×2 + 1px border */
        --header-font-size: 1rem; /* root font-size = resolved --font-size, base.css */
        --header-aside-block-size: calc(
            (var(--line-height, 1.5) + 1) * var(--header-font-size) + 1px
        );
        /* content row fits its tallest widget, a text input:
           1 line + 1.08 × padding-fixed + 2 borders (input.css) */
        --header-nav-block-size: calc(
            (var(--line-height, 1.5) + 1) * var(--header-font-size) +
            1.08 * var(--padding-fixed) + 2 * var(--border-width) + 1px
        );
        --sticky-header-height: calc(
            var(--header-aside-block-size) + var(--header-nav-block-size)
        );
        scroll-padding-block-start: var(--sticky-header-height);
    }

    body > header {
        position: sticky;
        inset-block-start: calc(-1 * var(--sticky-header-height));
        @container (scroll-state(scrolled: top)) {
            inset-block-start: 0;
        }
    }
    /* Ref: https://www.joshwcomeau.com/css/backdrop-filter/ */
    /* registered so the gradient stops can transition */
    @property --header-fade {
        syntax: "<percentage>";
        inherits: false;
        initial-value: 50%;
    }
    body > header {
        backdrop-filter: blur(16px);
        /* menu open: header + popover render as one sheet — the 50%-wide
           fade band slides down and off the header, onto the popover */
        --header-fade: 50%;
        background: linear-gradient(
            to bottom,
            var(--color-l0) calc(var(--header-fade) - 50%),
            transparent var(--header-fade)
        );
        transition: inset-block-start 0.3s, --header-fade 0.3s;

        &:has(:popover-open) {
            --header-fade: 150%;
        }
    }
    body > header {
        /* above sticky thead (z-index 1 in table.css) */
        z-index: 2;
        /* hamburger breakpoint container */
        container-type: inline-size;
        inline-size: 100%;
        /* popover menu attaches to header bottom */
        anchor-name: --header;

          /* fixed row heights — keeps html's scroll-padding calc exact */
          aside nav {
            block-size: var(--header-aside-block-size);
          }
          > nav {
            block-size: var(--header-nav-block-size);
          }

          nav {
            display: flex;
            gap: 1em;
            /* content must fit the fixed block-size, don't stretch it */
            align-items: center;
            /* aside + main + scrollspy */
            padding: 0.5em var(--padding-page-inline);
            border-block-end: solid #555 1px;

            div {
              display: flex;
              gap: 1em;
              min-inline-size: 0;
              align-items: center;
            }

            search, search form, search .group {
              display: flex;
              flex-direction: row;
              gap: 1em;
              align-items: center;
              min-inline-size: 0;
            }

            search input {
              min-inline-size: 0;
              inline-size: 100%;
            }

            ul {
              display: flex;
              gap: 1em;
            }

            &:has(.skip) > ul {
              margin-inline-start: auto;
            }

            li {
                align-self: anchor-center;
            }

            :is(a, button):focus-visible {
              outline: 2px solid currentColor;
              outline-offset: 2px;
            }

            .hamburger {
              display: none;
              margin-inline-start: auto;
            }
            .hamburger::before {
              content: "";
              inline-size: 1.25em;
              block-size: 1em;
              background-color: currentColor;
              /* bars */
              clip-path: polygon(0 0, 100% 0, 100% 20%, 0 20%, 0 40%, 100% 40%, 100% 60%, 0 60%, 0 80%, 100% 80%, 100% 100%, 0 100%);
              @media (forced-colors: active) {
                background-color: ButtonText;
              }
            }

            [popover] {
              display: flex;
              flex: 1 1 0%;
              gap: 1em;
              min-inline-size: 0;
              position: static;
              inline-size: auto;
              block-size: auto;
              margin: 0;
              border: none;
              padding: 0;
              overflow: visible;
              background: none;
              color: inherit;

              > div:last-child {
                margin-inline-start: auto;
              }
            }
          }

          @container (inline-size < 60ch) {
            nav {
              .hamburger {
                display: flex;
                align-items: center;
                justify-content: center;
              }
              /* panel styles on the base state so they persist while
                 closing; display/overlay flip at transition end */
              [popover] {
                display: none;
                position: fixed;
                position-anchor: --header;
                inset: auto;
                inset-block-start: anchor(end);
                /* full width, flush with header bottom */
                inset-inline: 0;
                /* closed target for the slide — padding collapses too,
                   else it holds the box open a sliver at the end */
                block-size: 0;
                padding-block: 0;
                max-block-size: 80dvh;
                overflow: auto;
                border-block-end: solid #555 1px;
                padding-inline: var(--padding-page-inline);
                /* continues the closed-header look over header + menu:
                   solid at the (now solid) header, fading out below */
                backdrop-filter: blur(16px);
                background: linear-gradient(to bottom, var(--color-l0), transparent);
                /* slide open/closed; the gradient repaints over the
                   moving box, so the fade rides the edge */
                interpolate-size: allow-keywords;
                transition:
                  block-size 0.3s,
                  padding-block 0.3s,
                  display 0.3s allow-discrete,
                  overlay 0.3s allow-discrete;

                > div {
                  display: block;
                }
                ul {
                  flex-direction: column;
                  gap: 0;
                }
                li {
                  align-self: stretch;
                }
                a {
                  min-block-size: 44px;
                  align-items: center;
                }
              }
              [popover]:popover-open {
                display: block;
                block-size: auto;
                padding-block: 0.5em;
                @starting-style {
                  block-size: 0;
                  padding-block: 0;
                }
              }
            }
          }
        }
      }
</style>
