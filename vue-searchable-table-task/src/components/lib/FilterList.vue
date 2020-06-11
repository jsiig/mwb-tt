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

<style>
  .filter-list {
    list-style: none;
    margin: 0;
  }
</style>
