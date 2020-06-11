<template>
  <div id="app">
    <div v-if="error">{{error}}</div>
  </div>
</template>

<script>
import api from './lib/api'

export default {
  name: 'App',

  data () {
    return {
      albums: [],
      photos: [],
      error: null
    }
  },

  components: {},

  methods: {
    async fetchData () {
      try {
        this.albums = await api.albums()
        this.photos = await api.photos()
      } catch (e) {
        this.error = 'Something went a bit wrong with the request.'
      }
    }
  },

  async mounted () {
    this.fetchData()
  }
}
</script>

<style lang="scss">
html, body {
  margin: 0;
  width: 100%;
  height: 100%;
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  background: $primary-color linear-gradient(135deg, $primary-color, $primary-color-alt);

  &, * {
    box-sizing: border-box;
  }
}

#app {
  width: 100%;
  height: 100%;
  padding: 2vh 2vw;
  margin: 0;
}
</style>
