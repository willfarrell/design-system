<script>
import Tag from "@design-system/components/Tag.svelte";
import Li from "@design-system/elements/li.svelte";
import P from "@design-system/elements/p.svelte";
import Ul from "@design-system/elements/ul.svelte";
</script>

<P>Tagged with: <Tag href="/layout/search?tag=tag">tag</Tag></P>

<Ul>
  <Li><Tag href="/layout/search?tag=tag">tag</Tag></Li>
</Ul>
