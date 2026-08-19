<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-task.js?worker&url";
import A from "../elements/a.svelte";
import Li from "../elements/li.svelte";
import Small from "../elements/small.svelte";
import Span from "../elements/span.svelte";
import Strong from "../elements/strong.svelte";
import Ul from "../elements/ul.svelte";
import Icon from "./Icon.svelte";

const { is = "ds-task", tasks = [] } = $props();

// task.sort rides onto the row as data-sort-*, giving TaskListSortable machine
// values (epoch millis, ordinals) to order by instead of the localized text.
const sortData = (sort = {}) =>
	Object.fromEntries(
		Object.entries(sort).map(([key, value]) => [`data-sort-${key}`, value]),
	);
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

{#snippet li(task)}
  <Li {is} id={task.id} {...sortData(task.sort)}>
    <A href={task.href}>{task.label}</A>
    <!-- task.icon takes one src or a list: a row can carry more than one marker
         (e.g. "still reporting" and "fails a scan check" are different facts). -->
    {#each [task.icon ?? []].flat() as icon}<Icon src={icon} />{/each}
    <Strong class={task.tag}>
      <Span>{task.status}</Span>
    </Strong>
    {#if task.note}<Small>{task.note}</Small>{/if}
  </Li>
{/snippet}

{#if tasks.length}
  <Ul>
    {#each tasks as task}
      {@render li(task)}
    {/each}
  </Ul>
{/if}
