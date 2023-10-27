<script>
  /*
  import { page } from '$app/stores'

    let request
    page.subscribe((value) => {
      request = value
    })
    const {pathname, search} = request.url
  */
  
  const {pathname, hash, search} = {pathname:'/', hash:'', search:''} // TODO remove
  
  export let href;

  let path = pathname+hash;
  if (search?.substring(0, 2) !== "?/") {
    path += search;
  }
  const external = href?.substring(0, 8) === "https://";
</script>

<a
  {...$$props}
  {href}
  target={external ? "_blank" : null}
  rel={external ? "noreferrer" : null}
  aria-current={path === href ? "page" : null}><slot /></a
>
