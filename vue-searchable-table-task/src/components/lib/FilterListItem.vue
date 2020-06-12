<template>
  <li class="filter-list-item" :class="listItemClass" @click="toggle">
    {{filter.title}}
    <ion-icon name="close-circle-outline" v-if="filter.enabled"></ion-icon>
    <ion-icon name="checkmark-circle-outline" v-else></ion-icon>
  </li>
</template>

<script>
export default {
  name: 'FilterListItem',
  props: {
    filter: {
      type: Object,
      required: true
    }
  },

  computed: {
    listItemClass () {
      return {
        'filter-list-item--enabled': this.filter.enabled
      }
    }
  },

  methods: {
    toggle () {
      this.$emit('toggle')
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-list-item {
    user-select: none;
    font-size: 12px;
    font-weight: $font-weight-regular;
    display: inline-block;
    padding: 3px 8px;
    margin: 3px;
    border-radius: 500px;
    cursor: pointer;
    vertical-align: baseline;
    border: 1px solid $primary-color-alt;
    color: $primary-color-alt;
    &--enabled {
      background: $primary-color linear-gradient(135deg, $primary-color -20%, $primary-color-alt 110%);
      color: $white;
    }
    ion-icon { position: relative; bottom: -2px; }
  }
</style>
