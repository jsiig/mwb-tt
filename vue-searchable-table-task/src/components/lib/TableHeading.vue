<template>
  <th>
    <div class="th-inner">
      <slot></slot>
    </div>
  </th>
</template>

<script>
export default {
  name: 'TableHeading'
}
</script>

<style lang="scss" scoped>
  th {
    // https://caniuse.com/#feat=css-sticky
    // Blink, Webkit, Firefox only - would need to figure something out for old and alternative browsers
    position: sticky;
    top: 0;
    margin: 0;
    padding: 0;
    background-color: $white;

    // Render box shadow for entire row
    // Quick hack to make it work with position: sticky
    &:first-of-type {
      &:before {
        width: calc(100vw - #{2 * $site-padding-horizontal});
        top:0;
        height: 100%;
        position: absolute;
        z-index: -1;
        content: '';
        box-shadow: $site-shadow;
      }
    }
  }

  .th-inner {
    padding: 8px;
    width: 100%;
    border-bottom: 1px solid rgba($black, 0.25);
  }
</style>
