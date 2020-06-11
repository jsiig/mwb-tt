<template>
  <img :src="src" :alt="alt">
</template>

<script>
export default {
  name: 'Thumbnail',
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: false,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
  img {
    width: 75px;
    height: 75px;
  }
</style>
