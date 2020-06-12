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
    top: 100px;
    margin: 0;
    padding: 0;
    background-color: $white;
    vertical-align: top;

    // Render box shadow for entire row
    // Quick hack to make box shadow around thead work with position: sticky
    // Depends on the table being full width, also only single tr in thead
    &:first-of-type {
      &:before {
        width: calc(100vw - #{2 * $site-padding-horizontal});
        top:0;
        left: 0;
        right: 0;
        height: 100%;
        position: absolute;
        z-index: -1;
        content: '';
        box-shadow: $site-shadow;
      }
    }

    &:first-child {
      padding-left: $site-padding-horizontal / 8;
    }

    &:last-child {
      text-align: right;
      padding-right: $site-padding-horizontal / 8;
    }

    @include breakpoint('min-width', $breakpoint-small) {
      &:first-child {
        padding-left: $site-padding-horizontal / 2;
      }

      &:last-child {
        padding-right: $site-padding-horizontal / 2;
      }
    }
  }

  .th-inner {
    width: 100%;
    height: 100%;
    padding: 4px;

    @include breakpoint('min-width', $breakpoint-small) {
      padding: 8px;
    }
  }
</style>
