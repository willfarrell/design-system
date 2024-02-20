<script>
	import P from '@design-system/svelte/element/p.svelte';

	const paragraphStart =
		'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
	const paragraphEnd =
		'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';
</script>

<P
	>{paragraphStart} http://example.org<wbr />/0000000000<wbr />/0000000000<wbr />/0000000000<wbr
	/>/0000000000<wbr />/0000000000<wbr />/0000000000
	{paragraphEnd}</P
>
<P
	>{paragraphStart} 0.000000000000000<wbr />0000000000000000<wbr />0000000000<wbr />000000000<wbr
	/>00000000006. {paragraphEnd}</P
>
