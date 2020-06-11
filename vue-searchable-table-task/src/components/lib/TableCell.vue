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
    padding: 8px;

    &:first-child {
      padding-left: $site-padding-horizontal / 2;
    }

    &:last-child {
      text-align: right;
      padding-right: $site-padding-horizontal / 2;
    }
  }
</style>
