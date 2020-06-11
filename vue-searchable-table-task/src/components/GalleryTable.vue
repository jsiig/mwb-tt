<template>
  <div class="gallery-table__container">
    <Table class="gallery-table">
      <TableHeader class="gallery-table__header">
        <TableRow>
          <TableHeading>Album ID</TableHeading>
          <TableHeading>Album Title</TableHeading>
          <TableHeading>Photo Title</TableHeading>
          <TableHeading>Thumbnail</TableHeading>
        </TableRow>
      </TableHeader>
      <TableBody class="gallery-table__body">
        <TableRow v-for="(photo) in photosWithAlbumsLimited" :key="photo.id">
          <TableCell>{{photo.album.id}}</TableCell>
          <TableCell>{{photo.album.title}}</TableCell>
          <TableCell>{{photo.title}}</TableCell>
          <TableCell><img :src="photo.thumbnailUrl" alt=""></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </div>
</template>

<script>
import Table from './lib/Table'
import TableHeader from './lib/TableHeader'
import TableBody from './lib/TableBody'
import TableCell from './lib/TableCell'
import TableRow from './lib/TableRow'
import TableHeading from './lib/TableHeading'

import debounce from '../lib/debounce'

const BOTTOM_SCROLL_OFFSET = 50

export default {
  name: 'GalleryTable',

  components: {
    Table,
    TableHeader,
    TableBody,
    TableCell,
    TableRow,
    TableHeading
  },

  props: {
    albums: {
      type: Array,
      required: true
    },

    photos: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      debouncedScrollHandler: debounce(this.scrollHandler),
      size: 25
    }
  },

  computed: {
    photosWithAlbumsLimited () {
      return this.photosWithAlbums.slice(0, this.size)
    },

    photosWithAlbums () {
      return this.photos.map(photo => {
        return {
          ...photo,
          album: this.albums.find(album => album.id === photo.albumId)
        }
      })
    }
  },

  created () {
    window.addEventListener('scroll', this.debouncedScrollHandler)
  },

  destroyed () {
    window.removeEventListener('scroll', this.debouncedScrollHandler)
  },

  methods: {
    scrollHandler (event) {
      console.log(event)
      const { body, documentElement } = document
      const { scrollTop } = documentElement

      // Probably unnecessary nowadays
      const documentHeight = Math.max(
        body.scrollHeight,
        body.offsetHeight,
        documentElement.clientHeight,
        documentElement.scrollHeight,
        documentElement.offsetHeight
      )

      const scrolledHeightBottom = scrollTop + documentElement.clientHeight

      if (
        documentHeight - scrolledHeightBottom < BOTTOM_SCROLL_OFFSET &&
        this.photosWithAlbumsLimited.length
      ) {
        this.loadMore()
      }
    },

    loadMore () {
      this.size += 25
    }
  }
}
</script>

<style lang="scss" scoped>
  .gallery-table {
    &__container {
      height: 100%;
      background: $white;
      box-shadow: 2px 2px 8px 2px rgba($black, 0.2);
    }
  }
</style>
