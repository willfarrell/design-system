<script>
import Tag from "@design-system/components/Tag.svelte";
import Footer from "@design-system/elements/footer.svelte";
import Li from "@design-system/elements/li.svelte";
import P from "@design-system/elements/p.svelte";
import Ul from "@design-system/elements/ul.svelte";
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
