<template>
  <table>
    <slot></slot>
  </table>
</template>

<script>
export default {
  name: 'Table'
}
</script>

<style lang="scss" scoped>
  table {
    // Reset
    margin: 0;
    padding: 0;
    border: none;
  }
</style>
