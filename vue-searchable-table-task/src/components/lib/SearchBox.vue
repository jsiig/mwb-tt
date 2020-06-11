<template>
  <label class="search-box" :class="containerClass">
    <ion-icon name="search-outline"></ion-icon>
    <input @focus="focused = true" @blur="focused = false" type="text" v-model="innerValue">
  </label>
</template>

<script>
export default {
  name: 'SearchBox',

  props: {
    value: {
      type: String,
      required: false,
      default: ''
    }
  },

  computed: {
    containerClass () {
      return {
        'search-box--has-content': this.innerValue.trim().length,
        'search-box--focused': this.focused
      }
    }
  },

  data () {
    return {
      innerValue: '',
      focused: false
    }
  },

  mounted () {
    this.innerValue = this.value
  },

  watch: {
    innerValue (newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
  .search-box {
    $font-size: $body-font-size * 1.25;

    padding: 4px;
    display: flex;
    flex-flow: row nowrap;
    width: 100%;
    font-size: $font-size * 1.25;
    border-bottom: 2px solid rgba(grayscale($primary-color-alt), 0.25);
    color: rgba(grayscale($primary-color-alt), 0.25);

    input {
      margin-left: 4px;
      font-family: $font-family;
      font-weight: $font-weight-regular;
      appearance: none;
      border: none;
      outline: none;
      font-size: $font-size;
      flex: 1 0 auto;
    }

    input:focus, &--has-content input {
      color: $primary-color-alt;
    }

    &--has-content, &--focused {
      border-bottom: 2px solid $primary-color-alt;
      color: $primary-color-alt;
    }
  }
</style>
