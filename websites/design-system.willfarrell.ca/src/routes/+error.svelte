<script>
    import "@styles/above.css";
    import H1 from "@design-system/components/Heading1.svelte";
import Image from "@design-system/components/Image.svelte";
import Div from "@design-system/elements/div.svelte";
import Main from "@design-system/elements/main.svelte";
import P from "@design-system/elements/p.svelte";
import Span from "@design-system/elements/span.svelte";
import belowStyles from "@styles/below.css?url";
    import printStyles from "@styles/print.css?url";
import { page } from "$app/state";
    import bootstrapUrl from "../scripts/bootstrap.js?url&worker";

const status = $derived.by(() => {
	try { return status; } catch { return 500; }
});
</script>

<svelte:head>
    <title>{status} | Design System</title>
    <meta name="description" content="Error page" />

    <link rel="preload stylesheet" as="style" href="{belowStyles}" />
    <link rel="stylesheet" media="print" href="{printStyles}" />
    <script src="{bootstrapUrl}" type="module"></script>
</svelte:head>

<Main id="main" class="container-error">
    <Div>
        <Image
            src="/img/logo.svg"
            alt="Design System"
            height="74"
            width="162"
            decoding="auto"
            fetchpriority="high"
            loading="eager"
        />
        <H1>{status}</H1>
        {#if status === 500}
            <P>
                {import.meta.env.AWS_REQUEST_ID ??
                    "00000000-0000-0000-0000-000000000000"}
            </P>
        {/if}
    </Div>
</Main>

<style>
    :global(html),
    :global(body) {
        block-size: 100%;
    }
    :global(main.container-error) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        block-size: 100%;

        & div {
            inline-size: 40ch;
            text-align: center;
        }
        & span {
            padding: 0 1rem 1rem 1rem;
            white-space: nowrap;
        }
    }
</style>
