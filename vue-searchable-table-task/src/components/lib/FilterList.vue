<template>
  <ul class="filter-list">
    <slot></slot>
  </ul>
</template>

<script>
export default {
  name: 'FilterList'
}
</script>

<style lang="scss" scoped>
  .filter-list {
    list-style: none;
    display: inline;
    padding-left: 10px;
  }
</style>
