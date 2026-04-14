<script>
import ButtonSubmit from "@design-system/components/ButtonSubmit.svelte";
import Form from "@design-system/components/Form.svelte";
import InputWebAuthnCreate from "@design-system/components/InputWebAuthnCreate.svelte";
import InputWebAuthnGet from "@design-system/components/InputWebAuthnGet.svelte";
import A from "@design-system/elements/a.svelte";
import H2 from "@design-system/elements/h2.svelte";
import P from "@design-system/elements/p.svelte";

const webAuthnOptions = {};
</script>

<H2>Register</H2>
<P>WebAuthn create input is a hidden input used during passkey registration.</P>
<InputWebAuthnCreate name="webauthn-create" data-options="{webAuthnOptions}" />

<H2>Authenticate</H2>
<P>WebAuthn get input is a hidden input used during passkey authentication.</P>
<InputWebAuthnGet name="webauthn-get" data-options="{webAuthnOptions}" />

<P>Need help? <A href="/form/input-webauthn" target="_top">View our guidance</A></P>
