<template>
  <div class="error-screen">
    <h2>Oh no!</h2>
    <h3><slot></slot></h3>
    <button @click="$emit('retry')">Try again?</button>
  </div>
</template>

<script>

</script>

<style lang="scss" scoped>
  div {
    width: 100%;
    height: 100%;
    flex: 1 0 auto;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    background-color: $white;
  }

  h2 {
    font-size: $page-title-size * 0.75;
    color: $error-color;
    margin-top: 0;
    margin-bottom: 10px;
  }

  h3 {
    color: $error-color;
    font-size: $page-title-size * 0.5;
    margin-top: 0;
    margin-bottom: 10px;
  }

  button {
    font-family: $font-family;
    appearance: none;
    border: none;
    cursor: pointer;
    outline: none;
    background: $primary-color linear-gradient(135deg, $primary-color, $primary-color-alt);
    color: #FFF;
    padding: 10px 16px;
    font-weight: $font-weight-regular;
    font-size: $page-title-size * 0.33;
    letter-spacing: 0.5px;
  }
</style>
