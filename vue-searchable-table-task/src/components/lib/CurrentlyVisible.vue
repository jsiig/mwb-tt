<template>
  <div class="currently-visible">
    Displaying {{current}} of {{found}} <span v-if="found < total">of a total of {{total}}</span> photos
  </div>
</template>

<script>
export default {
  name: 'CurrentlyVisible',

  props: {
    current: {
      type: Number,
      required: true
    },

    found: {
      type: Number,
      required: true
    },

    total: {
      type: Number,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .currently-visible {
    font-weight: $font-weight-regular;
    font-size: 12px;
    position: fixed;
    bottom: 20px;
    background-color: $white;
    max-width: 300px;
    padding: 8px 14px;
    border-radius: 500px;
    opacity: 1;
    border: 1px solid rgba($black, 0.1);
    transition: opacity 0.25s ease-in-out;
    box-shadow: 2px 2px 4px 0px rgba($black, 0.25);

    &:hover {
      opacity: 0;
    }
  }
</style>
