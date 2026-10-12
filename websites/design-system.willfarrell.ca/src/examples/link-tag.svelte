<script>
import Tag from "@willfarrell-ds/svelte/components/Tag.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
</script>

<P>Tagged with: <Tag href="/layout/search?tag=tag">tag</Tag></P>

<Ul>
  <Li><Tag href="/layout/search?tag=tag">tag</Tag></Li>
</Ul>
