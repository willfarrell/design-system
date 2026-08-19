<script>
import webComponentUrl from "@willfarrell-ds/vanilla/components/ds-task-sortable.js?worker&url";
import A from "../elements/a.svelte";
import Div from "../elements/div.svelte";
import Optgroup from "../elements/optgroup.svelte";
import Option from "../elements/option.svelte";
import Select from "../elements/select.svelte";
import TaskList from "./TaskList.svelte";

// sorts: [{ value, label }] where value is the data-sort-<key> suffix carried by
// each task, "-" prefixed for descending. The first option is the order the
// server already rendered, so the list is correct before the component upgrades.
const {
	is = "ds-task",
	tasks = [],
	sorts = [],
	sortLabel = "Sort by",
	addHref,
	addLabel,
} = $props();
</script>

<svelte:head>
  <link rel="modulepreload" href={webComponentUrl} />
</svelte:head>

<Div is="ds-task-sortable">
  {#if addHref || sorts.length}
    <Div class="task-sortable-controls">
      {#if addHref}<A href={addHref}>{addLabel}</A>{/if}
      {#if sorts.length}
        <!-- No visible label: the optgroup says "Sort by" once the list is open
             and aria-label names the collapsed control. The div wrapper is
             load-bearing, select.chevron draws its arrow off the parent. -->
        <Div
          ><Select class="chevron" aria-label={sortLabel}
            ><Optgroup label={sortLabel}
              >{#each sorts as sort (sort.value)}<Option value={sort.value}
                  >{sort.label}</Option
                >{/each}</Optgroup
            ></Select
          ></Div
        >
      {/if}
    </Div>
  {/if}
  <TaskList {is} {tasks} />
</Div>
