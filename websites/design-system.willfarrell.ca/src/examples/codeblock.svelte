<script>
import Codeblock from "@design-system/components/Codeblock.svelte";

const code = `function greet(name) {
	return \`Hello, \${name}!\`;
}

greet("world");`;
</script>

<Codeblock language="js" {code} />
