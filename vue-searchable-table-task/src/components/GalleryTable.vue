<template>
  <div class="gallery-table__container">
    <div class="gallery-table__filter-area">
      <FilterDropdown>
        <template slot="dropdown-text">Select photo albums</template>

        <FilterListItem v-for="(filter, index) in query.albumFilters"
          :key="index"
          :filter="filter"
          @toggle="toggleFilter(filter)"
        />
      </FilterDropdown>

      <FilterList>
        <FilterListItem v-for="(filter, index) in displayedEnabledAlbumFilters"
          :key="index"
          :filter="filter"
          @toggle="toggleFilter(filter)"
        />
      </FilterList>
    </div>

    <Table class="gallery-table">
      <thead class="gallery-table__header">
        <TableRow>
          <TableHeading class="gallery-table__album-id">
            Album ID
            <SortButton @toggleSorting="toggleSorting" :sorting="query.sorting" column="albumId"></SortButton>
          </TableHeading>

          <TableHeading>
            Album Title
            <SortButton @toggleSorting="toggleSorting" :sorting="query.sorting" column="albumTitle"></SortButton>
            <SearchBox type="text" v-model="query.search.albumTitle" />
          </TableHeading>

          <TableHeading>
            Photo Title
            <SortButton @toggleSorting="toggleSorting" :sorting="query.sorting" column="title"></SortButton>
            <SearchBox type="text" v-model="query.search.title" />
          </TableHeading>

          <TableHeading class="gallery-table__thumbnail">Thumbnail</TableHeading>
        </TableRow>
      </thead>

      <TableBody class="gallery-table__body">
        <TableRow v-for="(photo) in displayablePhotos" :key="photo.id">
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
import TableBody from './lib/TableBody'
import TableCell from './lib/TableCell'
import TableRow from './lib/TableRow'
import TableHeading from './lib/TableHeading'
import Thumbnail from './lib/Thumbnail'

import FilterList from './lib/FilterList'
import FilterListItem from './lib/FilterListItem'
import FilterDropdown from './lib/FilterDropdown'
import SortButton from './lib/SortButton'
import SearchBox from './lib/SearchBox'

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
    TableBody,
    TableCell,
    TableRow,
    TableHeading,
    Thumbnail,
    FilterList,
    FilterListItem,
    FilterDropdown,
    SortButton,
    SearchBox
  },

  props: {
    photos: {
      type: Array,
      required: true
    },
    albums: {
      type: Array,
      required: true
    }
  },

  data () {
    return {
      displayableAllPhotos: [],
      query: {
        limit: INITIAL_COUNT,
        albumFilters: [],
        sorting: {
          ...SORTING_DEFAULTS
        },
        search: {
          albumTitle: '',
          title: ''
        }
      },

      // Not the correct way of doing things, but works (methods inside `data()`)
      debouncedScrollHandler: debounce(this.scrollHandler),
      debouncedSetPhotos: debounce(this.setPhotos, 100)
    }
  },

  computed: {
    displayablePhotos () {
      return this.limit(this.displayableAllPhotos)
    },
    enabledAlbumFilters () {
      return this.query.albumFilters.filter(filter => filter.enabled)
    },
    displayedEnabledAlbumFilters () {
      return this.enabledAlbumFilters.slice(0, 5)
    }
  },

  created () {
    window.addEventListener('scroll', this.debouncedScrollHandler)
  },

  destroyed () {
    window.removeEventListener('scroll', this.debouncedScrollHandler)
  },

  mounted () {
    this.setPhotos()

    this.query.albumFilters = this.albums.slice().map(album => {
      return {
        ...album,
        enabled: false
      }
    })
  },

  methods: {
    setPhotos () {
      // Work with a copy of prop value
      let photos = this.photos.slice()
      const { query } = this

      // Only run search action when we can filter something
      if (Object.values(query.search).some(searchQuery => searchQuery.trim().length)) {
        photos = this.search(photos)
      }

      // Only sort if these are not defaults already
      // This is not reliable as should the response order from the
      // API change at any point, this will break
      // Speed optimisation for now.
      if (
        query.sorting.column !== SORTING_DEFAULTS.column ||
        query.sorting.direction !== SORTING_DEFAULTS.direction
      ) {
        photos = this.sort(photos)
      }

      if (this.enabledAlbumFilters.length) {
        photos = this.filter(photos)
      }

      // Assign to data property
      this.displayableAllPhotos = photos

      // Reset to 25 items on changes
      this.resetSize()
    },

    limit (photos) {
      return photos.slice(0, this.query.limit)
    },

    search (photos) {
      const { search } = this.query

      Object.keys(search).forEach(key => {
        const term = search[key].trim().toLowerCase()

        if (term.length) {
          photos = photos.filter(photo => {
            return photo[key].trim().toLowerCase().includes(term)
          })
        }
      })

      return photos
    },

    sort (photos) {
      const { column, direction } = this.query.sorting

      return photos.slice().sort((a, b) => {
        const flip = direction === ASC

        let result = 0

        if (a[column] < b[column]) result = 1
        else if (a[column] > b[column]) result = -1

        return flip ? result * -1 : result
      })
    },

    filter (photos) {
      const { albumFilters } = this.query
      const albumIds = albumFilters.filter(filter => filter.enabled).map(filter => filter.id)
      return photos.filter(photo => albumIds.includes(photo.albumId))
    },

    scrollHandler () {
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
        this.displayableAllPhotos.length
      ) {
        this.loadMore()
      }
    },

    loadMore () {
      this.query.limit += LOAD_MORE_COUNT
    },

    resetSize () {
      document.body.scrollTop = 0
      this.query.limit = INITIAL_COUNT
    },

    toggleSorting (column) {
      const { sorting } = this.query

      if (sorting.column !== column) {
        sorting.direction = ASC
        sorting.column = column
      } else {
        sorting.direction = sorting.direction === ASC ? DSC : ASC
      }

      this.setPhotos()
    },

    toggleFilter (filter) {
      filter.enabled = !filter.enabled

      this.setPhotos()
    }
  },

  watch: {
    photos (newValue) {
      if (newValue.length) this.setPhotos()
    },

    'query.search.title' () {
      this.debouncedSetPhotos()
    },

    'query.search.albumTitle' () {
      this.debouncedSetPhotos()
    },

    'query.albumFilters' () {
      this.setPhotos()
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

    &__album-id {
      min-width: 150px;
    }
  }
</style>
