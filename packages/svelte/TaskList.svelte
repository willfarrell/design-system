<script>
// import webComponentUrl from "../component/ds-task.js?url";

import A from "./element/a.svelte";
import Li from "./element/li.svelte";
import Strong from "./element/strong.svelte";
import Ul from "./element/ul.svelte";

const { is = "ds-task", tasks = [] } = $props();
</script>

<!-- <svelte:head>
  <script src={webComponentUrl} type="module"></script>
</svelte:head> -->

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
