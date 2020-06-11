<template>
  <div class="gallery-table__container">
    <div class="gallery-table__filter-area">
      Filters:
      <FilterList>
        <FilterListItem v-for="(filter, index) in filters"
          :key="index"
          :filter="filter"
          @remove="removeFilter(index)"/>
      </FilterList>
    </div>

    <Table class="gallery-table">
      <TableHeader class="gallery-table__header">
        <TableRow>
          <TableHeading>
            Album ID
            <SortButton @toggleSorting="toggleSorting" :sorting="sorting" column="albumId"></SortButton>
          </TableHeading>

          <TableHeading>
            Album Title
            <SortButton @toggleSorting="toggleSorting" :sorting="sorting" column="albumTitle"></SortButton>
            <input type="text" v-model="search['albumTitle']">
          </TableHeading>

          <TableHeading>
            Photo Title
            <SortButton @toggleSorting="toggleSorting" :sorting="sorting" column="title"></SortButton>
            <input type="text" v-model="search['title']">
          </TableHeading>

          <TableHeading>Thumbnail</TableHeading>
        </TableRow>
      </TableHeader>

      <TableBody class="gallery-table__body">
        <TableRow v-for="(photo) in photosWithAlbumsLimited" :key="photo.id">
          <TableCell>{{photo.albumId}}</TableCell>

          <TableCell>{{photo.albumTitle}}</TableCell>

          <TableCell>{{photo.title}}</TableCell>

          <TableCell><Thumbnail :src="photo.thumbnailUrl" :alt="`Thumbnail: ${photo.title}`" /></TableCell>
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
import Thumbnail from './lib/Thumbnail'

import FilterListItem from './lib/FilterListItem'
import FilterList from './lib/FilterList'
import SortButton from './lib/SortButton'

import debounce from '../lib/debounce'

// How many pixels do we need to be from bottom of page for infinite scroll to trigger?
const BOTTOM_SCROLL_OFFSET = 50

// Initial count of images to display
const INITIAL_COUNT = 25

// When scrolling down, add this many when reaching bottom of page
const LOAD_MORE_COUNT = 25

const ASC = 'ASC'
const DSC = 'DSC'

const SORTING_DEFAULTS = {
  column: 'albumId',
  direction: ASC
}

export default {
  name: 'GalleryTable',

  components: {
    Table,
    TableHeader,
    TableBody,
    TableCell,
    TableRow,
    TableHeading,
    Thumbnail,
    FilterListItem,
    FilterList,
    SortButton
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
      limit: INITIAL_COUNT,
      filters: [],
      sorting: {
        ...SORTING_DEFAULTS
      },
      search: {
        albumTitle: '',
        title: ''
      }
    }
  },

  computed: {
    photosWithAlbumsLimited () {
      return this.photosSorted.slice(0, this.limit)
    },

    photosSearched () {
      let photos = this.photosWithAlbums.slice()

      Object.keys(this.search).forEach(key => {
        const term = this.search[key].trim().toLowerCase()

        if (term.length) {
          photos = photos.filter(photo => {
            return photo[key].trim().toLowerCase().includes(term)
          })
        }
      })

      return photos
    },

    photosSorted () {
      const { column, direction } = this.sorting

      // Defaults check - optimising for performance on load - sorting this way isn't really the most efficient
      if (column === SORTING_DEFAULTS.column && direction === SORTING_DEFAULTS.direction) {
        return this.photosSearched.slice()
      }
      console.log('resorting!')

      return this.photosSearched.slice().sort((a, b) => {
        const flip = direction === ASC

        let result = 0

        if (a[column] < b[column]) result = 1
        else if (a[column] > b[column]) result = -1

        return flip ? result * -1 : result
      })
    },

    photosWithAlbums () {
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
      this.limit += LOAD_MORE_COUNT
    },

    resetSize () {
      document.body.scrollTop = 0
      this.limit = INITIAL_COUNT
    },

    toggleSorting (column) {
      this.resetSize()

      if (this.sorting.column !== column) {
        this.sorting.direction = ASC
        this.sorting.column = column
      } else {
        this.sorting.direction = this.sorting.direction === ASC ? DSC : ASC
      }
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

    &__filter-area {
      width: 100%;
      height: 100px;
      padding: 16px;
      background-color: $white;
      position: sticky;
      top: 0;
      z-index: 3;
    }
  }
</style>
