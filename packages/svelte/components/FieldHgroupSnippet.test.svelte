<script>
import FieldHgroupSnippet from "./FieldHgroupSnippet.svelte";
import FieldInput from "./FieldInput.svelte";
import Fieldset from "./Fieldset.svelte";

const { prefix } = $props();
</script>

{#snippet labelSnippet(label)}
  <FieldHgroupSnippet {prefix} {label} />
{/snippet}
{#snippet legendSnippet(label)}
  <FieldHgroupSnippet {prefix} {label} />
{/snippet}

<FieldInput id="email" label="Email" {labelSnippet} />
<Fieldset id="radio" label="Radios" {legendSnippet} />
