<script>
  import Fieldset from "./element/fieldset.svelte";
  import InputHidden from "./InputHidden.svelte";
  import Ul from "./element/ul.svelte";
  import Li from "./element/li.svelte";
  import A from "./element/a.svelte";
  import Icon from "./Incon.svelte";
  let { ...props } = $props()
  let {
    id = "browser-up-to-date"
  } = props
  let {
    is = 'input-' + id,
    label,
    legend,
    hint, 
    error
  } = props
  error = error?.filter((v) => v.id === id);
</script>

{#if error?.length}
  <Fieldset
    {id}
    {is}
    {label}
    {legend}
    {hint}
    {error}
  >
    <Ul>
      <Li id="chrome">
        <A
          href="https://www.google.com/chrome/update"
          ><Icon
            src="/img/icons.browser.svg#chrome"
            alt="Chrome"
          /></A
        >
      </Li>
      <Li id="edge">
        <A
          href="https://support.microsoft.com/en-us/topic/update-to-the-new-microsoft-edge-182d0668-e3f0-49da-b8bb-db5675245dc2"
          ><Icon
            src="/img/icons.browser.svg#edge"
            alt="Edge"
          /></A
        >
      </Li>
      <Li id="firefox">
        <A
          href="https://support.mozilla.org/kb/update-firefox-latest-release"
          ><Icon
            src="/img/icons.browser.svg#firefox"
            alt="Firefox"
          /></A
        >
      </Li>
      <Li id="safari">
        <A
          href="https://support.apple.com/en-us/HT204416"
          ><Icon
            src="/img/icons.browser.svg#safari"
            alt="Safari"
          /></A
        >
      </Li>
    </Ul>
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
