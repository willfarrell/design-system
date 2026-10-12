<script>
import Alert from "@willfarrell-ds/svelte/components/Alert.svelte";
import Strong from "@willfarrell-ds/svelte/elements/strong.svelte";
</script>

<Alert role="alert" data-theme="fail">
	<Strong>Assertive:</Strong> message about the alert.
</Alert>

<Alert role="status" data-theme="info">
	<Strong>Polite:</Strong> message about the status.
</Alert>
