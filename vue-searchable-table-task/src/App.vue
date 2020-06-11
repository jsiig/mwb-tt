<template>
  <div id="app" class="app">
    <header class="app__header">
      <PageTitle>Gallery Table</PageTitle>
      <Author />
    </header>
    <section class="app__main">
      <transition name="main-screen" mode="out-in">
        <LoadingScreen v-if="loading"></LoadingScreen>
        <GalleryTable v-else-if="!loading && !error" :photos="photosJoinAlbums" />
        <ErrorScreen @retry="fetchData" v-else>{{error}}</ErrorScreen>
      </transition>
    </section>
  </div>
</template>

<script>
import api from './lib/api'

import PageTitle from './components/lib/PageTitle'
import Author from './components/lib/Author'

import LoadingScreen from './components/LoadingScreen'
import ErrorScreen from './components/ErrorScreen'
import GalleryTable from './components/GalleryTable'

export default {
  name: 'App',

  data () {
    return {
      albums: [],
      photos: [],
      error: null,
      loading: true
    }
  },

  components: {
    PageTitle,
    Author,
    GalleryTable,
    LoadingScreen,
    ErrorScreen
  },

  computed: {
    photosJoinAlbums () {
      if (!this.photos.length || !this.albums.length) return []

      return this.photos.map(photo => {
        const album = this.albums.find(album => album.id === photo.albumId)

        return {
          ...photo,
          albumTitle: album.title,
          albumId: album.id
        }
      })
    }
  },

  methods: {
    async fetchData () {
      this.loading = true
      try {
        this.albums = await api.albums()
        this.photos = await api.photos()
      } catch (e) {
        this.error = 'Something went a bit wrong with the request.'
      } finally {
        this.loading = false
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
  font-family: $font-family;
  background: $primary-color linear-gradient(135deg, $primary-color, $primary-color-alt) fixed;

  &, * {
    box-sizing: border-box;
  }
}

.app {
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: $site-padding-vertical $site-padding-horizontal;
  margin: 0;
  display: flex;
  flex-flow: column nowrap;

  &__header {
    flex: 0 0 auto;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
  }
  &__main { flex: 1 0 auto; }
}

.main-screen {
  &-enter-active, &-leave-active {
    transition-delay: 1s;
    transition: opacity .4s;
  }

  &-enter, &-leave-to {
    opacity: 0;
  }
}
</style>
