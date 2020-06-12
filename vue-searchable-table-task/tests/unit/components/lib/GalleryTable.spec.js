import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import GalleryTable from '@/components/GalleryTable.vue'

describe('Main logic - GalleryTable component', () => {
  it('renders titles when passed as props', () => {
    const albumTitle = 'Displayable title'
    const photoTitle = 'A Photo'
    const wrapper = shallowMount(GalleryTable, {
      propsData: {
        photos: [
          { albumId: 1, albumTitle: 'Displayable title', photoTitle: 'A Photo' }
        ],
        albums: []
      }
    })
    expect(wrapper.text()).to.include(albumTitle)
    expect(wrapper.text()).to.include(photoTitle)
  })
})
