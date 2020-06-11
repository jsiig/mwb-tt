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
    font-size: $page-title-size;
    font-weight: $font-weight-bold;
    color: $white;
    margin-top: 0;
  }
</style>
