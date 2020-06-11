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
  }
</style>
