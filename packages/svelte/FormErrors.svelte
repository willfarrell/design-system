<script>
  import Div from './element/div.svelte';
  import Ul from './element/ul.svelte';
  import Li from './element/li.svelte';
  import A from './element/a.svelte';

  export let errors = []
</script>

{#if errors?.length}
  <!-- TODO auto focus https://github.com/alphagov/govuk-frontend/pull/1056/files#diff-5d5a3b8a8a1b3690e0012735d4402e041c32ed6e87afde94bb0972141259db1f -->
  <!-- TODO add in js to not crop off label when input focused -->
  <Div role="alert" class="form-errors">
    <slot /> <!-- h2 -->
    <Ul>
      {#each errors as error}
        <Li><A href="#{error.id}">{error.message}</A></Li>
      {/each}
    </Ul>
  </Div>
{/if}
