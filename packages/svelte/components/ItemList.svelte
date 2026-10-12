<script>
import A from "../elements/a.svelte";
import Li from "../elements/li.svelte";
import Small from "../elements/small.svelte";
import Span from "../elements/span.svelte";
import Strong from "../elements/strong.svelte";
import Ul from "../elements/ul.svelte";
import Dropdown from "./Dropdown.svelte";
import Icon from "./Icon.svelte";

const { items = [], icon = "/img/icons.svg#dots" } = $props();
const uid = $props.id();
</script>

{#if items.length}
  <Ul>
    {#each items as item, i}
      <Li class="ds-item" id={item.id}>
        <A href={item.href}>{item.label}</A>
        {#if item.status}
          <Strong class={item.tag}>
            <Span>{item.status}</Span>
          </Strong>
        {/if}
        {#if item.menu?.length}
          <Dropdown id="{item.id ?? `${uid}-${i}`}-menu">
            {#snippet button()}
              <Icon src={icon} /><Span class="visually-hidden">Actions for {item.label}</Span>
            {/snippet}
            <Ul>
              {#each item.menu as action}
                <Li><A href={action.href}>{action.label}</A></Li>
              {/each}
            </Ul>
          </Dropdown>
        {/if}
        {#if item.note}<Small>{item.note}</Small>{/if}
      </Li>
    {/each}
  </Ul>
{/if}
