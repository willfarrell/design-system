<script>
import Tag from "@willfarrell-ds/svelte/components/Tag.svelte";
import Footer from "@willfarrell-ds/svelte/elements/footer.svelte";
import Li from "@willfarrell-ds/svelte/elements/li.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";
import Ul from "@willfarrell-ds/svelte/elements/ul.svelte";
</script>

<Ul>
  <Li><Tag href="#">HTML</Tag></Li>
  <Li><Tag href="#">CSS</Tag></Li>
  <Li><Tag href="#">JavaScript</Tag></Li>
</Ul>
<P>or</P>
<Footer>
<P>Categorized under: <Tag href="#">HTML</Tag>, <Tag href="#">CSS</Tag>, <Tag href="#">JavaScript</Tag></P>
</Footer>
