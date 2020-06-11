<template>
  <div class="author">
    <h6>For MalwareBytes</h6>
    <h5>By <a href="mailto:joanna@siig.ee">Joanna Siig</a></h5>
  </div>
</template>

<script>
export default {
  name: 'Author'
}
</script>

<style lang="scss" scoped>
  .author {
    text-align: right;
  }

  h5, h6 {
    margin: 0;
    font-weight: $font-weight-regular;
    color: $white;
  }

  h5 {
    font-size: $page-title-size * 0.25;
  }

  h6 {
    font-size: $page-title-size * 0.35;
  }

  a {
    &, &:hover, &:visited, &:active {
      color: inherit;
      text-decoration: inherit;
    }

    &:hover {
      text-decoration: underline;
    }
  }
</style>
