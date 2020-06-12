<template>
  <h1><slot></slot></h1>
</template>

<script>
export default {
  name: 'PageTitle'
}
</script>

<style lang="scss" scoped>
  h1 {
    text-shadow: $text-shadow;
    font-size: $page-title-size;
    font-weight: $font-weight-bold;
    color: $white;
    margin: 0;
    padding-bottom: 3vw;
  }
</style>
