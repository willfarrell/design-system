<script>
import A from "../elements/a.svelte";
import Div from "../elements/div.svelte";
import H2 from "../elements/h2.svelte";
import Li from "../elements/li.svelte";
import Ul from "../elements/ul.svelte";

const { children, errors = [] } = $props();
</script>

{#if errors.length}
  <!-- TODO add in js to not crop off label when input focused -->
  <Div role="alert" tabindex="-1" class="form-errors" autofocus>
    <H2>{#if children}{@render children()}{:else}There's a problem{/if}</H2>
    <Ul>
      {#each errors as error}
        <Li>
          {#if error.id}<A href="#{error.id}">{error.message}</A
            >{:else}{error.message}{/if}
        </Li>
      {/each}
    </Ul>
  </Div>
{/if}
