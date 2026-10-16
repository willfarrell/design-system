<script>
import Breadcrumb from "@willfarrell-ds/svelte/components/Breadcrumb.svelte";
</script>

<Breadcrumb
  items={[
    { href: "/", text: "Home" },
    { href: "/component", text: "Components" },
    { href: "/component/breadcrumb", text: "Breadcrumb" },
  ]}
/>
