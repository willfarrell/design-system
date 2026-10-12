<script>
import Codeblock from "@willfarrell-ds/svelte/components/Codeblock.svelte";

const code = `function greet(name) {
	return \`Hello, \${name}!\`;
}

greet("world");`;
</script>

<Codeblock language="js" {code} />
