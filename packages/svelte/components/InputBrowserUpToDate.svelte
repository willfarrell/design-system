<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-input-browser-up-to-date.js?worker&url";
import A from "../elements/a.svelte";
import Li from "../elements/li.svelte";
import Ul from "../elements/ul.svelte";
import Fieldset from "./Fieldset.svelte";
import InputHidden from "./InputHidden.svelte";

const {
	id = "browser-up-to-date",
	is = `ds-input-${id}`,
	label,
	legend,
	hint,
	error,
} = $props();
const invalid = $derived(error?.some((v) => v.id === id));
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

{#if invalid}
  <Fieldset {id} {label} {legend} {hint} {error}>
    <Ul>
      <Li id="chrome"><A href="https://www.google.com/chrome/update">Chrome</A></Li>
      <Li id="edge"><A href="https://support.microsoft.com/en-us/topic/update-to-the-new-microsoft-edge-182d0668-e3f0-49da-b8bb-db5675245dc2">Edge</A></Li>
      <Li id="firefox"><A href="https://support.mozilla.org/kb/update-firefox-latest-release">Firefox</A></Li>
      <Li id="safari"><A href="https://support.apple.com/en-us/HT204416">Safari</A></Li>
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
      }
</style>
