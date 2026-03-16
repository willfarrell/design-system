<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-task.js?worker&url";
import A from "../elements/a.svelte";
import Li from "../elements/li.svelte";
import Strong from "../elements/strong.svelte";
import Ul from "../elements/ul.svelte";

const { is = "ds-task", tasks = [] } = $props();
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

{#snippet li(task)}
  <Li {is} id={task.id}>
    <A href={task.href}>{task.label}</A>
    <Strong class={task.tag}>
      {task.status}
    </Strong>
  </Li>
{/snippet}

{#if tasks.length}
  <Ul>
    {#each tasks as task}
      {@render li(task)}
    {/each}
  </Ul>
{/if}
