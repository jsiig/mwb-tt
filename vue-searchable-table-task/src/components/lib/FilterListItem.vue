<template>
  <li class="filter-list-item">
    {{filter.name}} - {{filter.value}}
    <span class="close" @click="$emit('remove')"><ion-icon name="close-circle-outline"></ion-icon></span>
  </li>
</template>

<script>
export default {
  name: 'FilterListItem',
  props: {
    filter: {
      type: Object
    }
  }
}
</script>

<style>
  .filter-list-item {

  }
</style>
