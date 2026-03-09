<script>
import Alert from "@design-system/components/Alert.svelte";
import Strong from "@design-system/elements/strong.svelte";
</script>

<Alert role="alert" data-theme="fail">
	<Strong>Assertive:</Strong> message about the alert.
</Alert>

<Alert role="status" data-theme="info">
	<Strong>Polite:</Strong> message about the status.
</Alert>
