<script>
  export let id
</script>
<dialog is="ds-dialog" {id} inert {...$$props}>
  <slot />
</dialog>
