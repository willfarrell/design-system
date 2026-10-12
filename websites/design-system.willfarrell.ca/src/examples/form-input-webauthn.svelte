<script>
import ButtonSubmit from "@willfarrell-ds/svelte/components/ButtonSubmit.svelte";
import Form from "@willfarrell-ds/svelte/components/Form.svelte";
import InputWebAuthnCreate from "@willfarrell-ds/svelte/components/InputWebAuthnCreate.svelte";
import InputWebAuthnGet from "@willfarrell-ds/svelte/components/InputWebAuthnGet.svelte";
import A from "@willfarrell-ds/svelte/elements/a.svelte";
import H2 from "@willfarrell-ds/svelte/elements/h2.svelte";
import P from "@willfarrell-ds/svelte/elements/p.svelte";

const webAuthnOptions = {};
</script>

<H2>Register</H2>
<P>WebAuthn create input is a hidden input used during passkey registration.</P>
<InputWebAuthnCreate name="webauthn-create" data-options="{webAuthnOptions}" />

<H2>Authenticate</H2>
<P>WebAuthn get input is a hidden input used during passkey authentication.</P>
<InputWebAuthnGet name="webauthn-get" data-options="{webAuthnOptions}" />

<P>Need help? <A href="/form/input-webauthn" target="_top">View our guidance</A></P>
