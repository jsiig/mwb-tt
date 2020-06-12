<template>
  <div class="filter-dropdown__wrap">
    <slot name="active"></slot>
    <a class="filter-dropdown__trigger" @click="visible = !visible">
      <span><slot name="dropdown-text"></slot></span>
      <ion-icon name="chevron-down-outline" v-if="!visible"></ion-icon>
      <ion-icon name="chevron-up-outline" v-else></ion-icon>
    </a>
    <div class="filter-dropdown" v-show="visible">
      <FilterList class="filter-dropdown__ul"><slot></slot></FilterList>
    </div>
  </div>
</template>

<script>
import FilterList from './FilterList'

export default {
  name: 'FilterDropdown',

  components: {
    FilterList
  },

  data () {
    return {
      visible: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-dropdown {
    display: block;
    margin: 0;
    padding: 0;
    background-color: $white;
    box-shadow: $site-shadow;
    position: absolute;
    top: calc(100% + 20px);
    width: 60vw;
    height: 60vh;
    overflow: auto;
    padding: $site-padding-horizontal / 4;

    &__trigger {
      user-select: none;
      line-height: 28px;
      display: inline-flex;
      justify-content: center;
      flex-flow: row nowrap;
      padding: 8px 16px;
      box-shadow: 2px 2px 4px 0px rgba($black, 0.25);
      background-color: $white;
      color: $primary-color-alt;
      border: 1px solid $primary-color-alt;
      border-radius: 500px;
      cursor: pointer;

      &:hover {
        color: $white;
        background-color: $primary-color-alt;
      }

      ion-icon {
        padding-top: 3px;
        margin-left: 16px;
        font-size: 150%;
        display: inline-block;
      }
    }

    &__ul {
      display: block;
      margin: 0;
      padding: 0;
    }

    &__wrap {
      display: inline-block;
      position: relative;
    }
  }
</style>
