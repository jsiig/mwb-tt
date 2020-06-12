<template>
  <td>
    <slot></slot>
  </td>
</template>

<script>
export default {
  name: 'TableCell'
}
</script>

<style lang="scss" scoped>
  td {
    padding: 4px;
    font-size: $body-font-size * 0.75;
    font-weight: $font-weight-regular;

    &:first-child {
      padding-left: $site-padding-horizontal / 8;
    }

    &:last-child {
      text-align: right;
      padding-right: $site-padding-horizontal / 8;
    }

    @include breakpoint('min-width', $breakpoint-small) {
      padding: 8px;
      font-size: $body-font-size;

      &:first-child {
        padding-left: $site-padding-horizontal / 2;
      }

      &:last-child {
        padding-right: $site-padding-horizontal / 2;
      }
    }
  }
</style>
