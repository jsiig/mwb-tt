<template>
  <tbody class="table-body">
    <slot></slot>
  </tbody>
</template>

<script>
export default {
  name: 'TableBody'
}
</script>

<style lang="scss">
.table-body {
  > tr {
    overflow-y: hidden;
    max-height: 1000px;

    &:nth-child(2n) {
      background-color: rgba($black, 0.03);
    }
  }
}
</style>
