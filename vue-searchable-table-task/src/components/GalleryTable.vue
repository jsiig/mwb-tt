<template>
  <div class="gallery-table__container">
    <Table class="gallery-table">

    </Table>
  </div>
</template>

<script>
import Table from './lib/Table'

export default {
  name: 'GalleryTable',

  components: {
    Table
  },

  props: {
    albums: {
      type: Array,
      required: true
    },

    photos: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .gallery-table {
    &__container {
      background: $white;
      box-shadow: 2px 2px 8px 2px rgba($black, 0.2);
    }
  }
</style>
