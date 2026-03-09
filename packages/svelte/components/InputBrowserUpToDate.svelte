<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-input-browser-up-to-date.js?url&worker";

import A from "../elements/a.svelte";
import Fieldset from "../elements/fieldset.svelte";
import Li from "../elements/li.svelte";
import Span from "../elements/span.svelte";
import Ul from "../elements/ul.svelte";
import Icon from "./Icon.svelte";
import InputHidden from "./InputHidden.svelte";

const { ...props } = $props();
const { id = "browser-up-to-date" } = props;
let { is = `ds-input-${id}`, label, legend, hint, error } = props;
error = error?.filter((v) => v.id === id);
</script>

<svelte:head>
  <!-- <script src={webComponentUrl} type="module"></script> -->
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

{#if error?.length}
  <Fieldset {id} {label} {legend} {hint} {error}>
    <Ul>
      <Li id="chrome">
        <A href="https://www.google.com/chrome/update"
          ><Icon src="/img/icons.browser.svg#chrome" /><Span
            class="visually-hidden">Chrome</Span
          ></A
        >
      </Li>
      <Li id="edge">
        <A
          href="https://support.microsoft.com/en-us/topic/update-to-the-new-microsoft-edge-182d0668-e3f0-49da-b8bb-db5675245dc2"
          ><Icon src="/img/icons.browser.svg#edge" alt="Edge" /><Span
            class="visually-hidden">Edge</Span
          ></A
        >
      </Li>
      <Li id="firefox">
        <A href="https://support.mozilla.org/kb/update-firefox-latest-release"
          ><Icon src="/img/icons.browser.svg#firefox" alt="Firefox" /><Span
            class="visually-hidden">Firefox</Span
          ></A
        >
      </Li>
      <Li id="safari">
        <A href="https://support.apple.com/en-us/HT204416"
          ><Icon src="/img/icons.browser.svg#safari" alt="Safari" /><Span
            class="visually-hidden">Safari</Span
          ></A
        >
      </Li>
    </Ul>
    <InputHidden {is} name={id} value="true" />
  </Fieldset>
{:else}
  <InputHidden {is} name={id} value="true" />
{/if}

<style>
  :global([is="ds-input-browser-up-to-date"]) {
    & ul {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      list-style-type: "";
    }
    & a {
      padding: 1rem;
      text-decoration: none;
    }
    & img {
      block-size: 3em;
      inline-size: 3em;
    }
  }
</style>
