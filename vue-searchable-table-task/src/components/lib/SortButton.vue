<template>
  <span @click="$emit('toggleSorting', column)" class="sort-button" :class="{'sort-button--enabled': enabled}">
    <ion-icon name="arrow-up-outline" v-if="ascending"></ion-icon>
    <ion-icon name="arrow-down-outline" v-else></ion-icon>
  </span>
</template>

<script>
export default {
  name: 'SortButton',
  props: {
    sorting: {
      type: Object,
      required: true
    },

    column: {
      type: String,
      required: false
    }
  },

  computed: {
    enabled () {
      return this.column === this.sorting.column
    },

    ascending () {
      if (!this.enabled) return true
      return this.sorting.direction === 'ASC'
    }
  }
}
</script>

<style lang="scss" scoped>
  .sort-button {
    padding: 5px;
    cursor: pointer;
    opacity: 0.5;
    &--enabled {
      opacity: 1;
    }
  }
</style>
