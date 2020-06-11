<template>
  <div id="app" class="app">
    <PageTitle class="app__header">Gallery Table</PageTitle>
    <GalleryTable v-if="!error" class="app__main" :albums="albums" :photos="photos" />
    <div class="app__main" v-else>{{error}}</div>
  </div>
</template>

<script>
import api from './lib/api'

import PageTitle from './components/lib/PageTitle'
import GalleryTable from './components/GalleryTable'
export default {
  name: 'App',

  data () {
    return {
      albums: [],
      photos: [],
      error: null
    }
  },

  components: {
    PageTitle,
    GalleryTable
  },

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
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
  background: $primary-color linear-gradient(135deg, $primary-color, $primary-color-alt);

  &, * {
    box-sizing: border-box;
  }
}

.app {
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 3vh 3vw;
  margin: 0;
  display: flex;
  flex-flow: column nowrap;

  &__header { flex: 0 0 auto; }
  &__main { flex: 1 0 auto; }
}
</style>
