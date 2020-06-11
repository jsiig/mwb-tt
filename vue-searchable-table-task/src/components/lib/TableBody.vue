<template>
  <transition-group name="table-body" class="table-body" tag="tbody">
    <slot></slot>
  </transition-group>
</template>

<script>
export default {
  name: 'TableBody'
}
</script>

<style lang="scss">
.table-body {
  > tr {
    opacity: 1;
    transition: opacity 1s;
    overflow-y: hidden;
    max-height: 1000px;
  }
}

.table-body-enter, .table-body-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
