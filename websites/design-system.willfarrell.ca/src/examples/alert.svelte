<script>
import Alert from "@design-system/svelte/Alert.svelte";
import Strong from "@design-system/svelte/element/strong.svelte";
</script>

<Alert role="alert" data-theme="warn">
	<Strong>Assertive:</Strong> message about the alert.
</Alert>

<Alert role="status" data-theme="info">
	<Strong>Polite:</Strong> message about the status.
</Alert>
