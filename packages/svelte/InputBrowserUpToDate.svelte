<script>
  import Fieldset from "./element/fieldset.svelte";
  import InputHidden from "./InputHidden.svelte";

  export let id, legend, label, hint, error;
  id ??= "browser-up-to-date";
  error = error?.filter((v) => v.id === id);
</script>

{#if error?.length}
  <Fieldset
    {id}
    is="input-{id}"
    {label}
    {hint}
    {error}
  >
    <ul>
      <li id="chrome">
        <a
          target="_blank"
          href="https://www.google.com/chrome/update"
          rel="noreferrer"
          ><img
            class="icon"
            src="/img/icons.browser.svg#chrome"
            alt={t("browser-chrome")}
          /></a
        >
      </li>
      <li id="edge">
        <a
          target="_blank"
          href="https://support.microsoft.com/en-us/topic/update-to-the-new-microsoft-edge-182d0668-e3f0-49da-b8bb-db5675245dc2"
          rel="noreferrer"
          ><img
            class="icon"
            src="/img/icons.browser.svg#edge"
            alt={t("browser-edge")}
          /></a
        >
      </li>
      <li id="firefox">
        <a
          target="_blank"
          href="https://support.mozilla.org/kb/update-firefox-latest-release"
          rel="noreferrer"
          ><img
            class="icon"
            src="/img/icons.browser.svg#firefox"
            alt={t("browser-firefox")}
          /></a
        >
      </li>
      <li id="safari">
        <a
          target="_blank"
          href="https://support.apple.com/en-us/HT204416"
          rel="noreferrer"
          ><img
            class="icon"
            src="/img/icons.browser.svg#safari"
            alt={t("browser-safari")}
          /></a
        >
      </li>
    </ul>
    <InputHidden name={id} value="true" />
  </Fieldset>
{:else}
  <Fieldset {id} is="input-{id}">
    <InputHidden name={id} value="true" />
  </Fieldset>
{/if}

<style>
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    list-style-type: '';
  }
  a {
    padding: 1rem;
    text-decoration: none;
  }
  img {
    height: 3rem;
    width: 3rem;
  }
</style>
