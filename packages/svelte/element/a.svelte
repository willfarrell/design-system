<script>
  import { page } from '$app/stores'
  
  const {pathname, hash} = $page.url
  
  export let href;

  let path = pathname+hash;
  // Prevents prerendering
  // if (search?.substring(0, 2) !== "?/") {
  //   path += search;
  // }
  const external = href?.substring(0, 8) === "https://";
</script>

<a
  {...$$props}
  {href}
  target={external ? "_blank" : null}
  rel={external ? "noreferrer" : null}
  aria-current={href === path ? "page" : null}><slot /></a
>
