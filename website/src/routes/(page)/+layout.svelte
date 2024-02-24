<script>
	import '@styles/app.css'
	import PageHeader from '@design-system/svelte/element/header.svelte';
	import PageFooter from '@design-system/svelte/element/footer.svelte';
</script>

<PageHeader/>
<slot />
<PageFooter/>
