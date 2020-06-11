<template>
  <div class="loading-screen">
    <h2>Loading...</h2>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  .loading-screen {
    width: 100%;
    height: 100%;
    flex: 1 0 auto;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;

    h2 {
      font-size: $page-title-size * 0.75;
      color: $white;
    }
  }
</style>
