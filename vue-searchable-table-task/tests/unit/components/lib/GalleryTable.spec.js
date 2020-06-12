import { expect } from 'chai'
import { mount, shallowMount } from '@vue/test-utils'
import GalleryTable from '@/components/GalleryTable.vue'
import SearchBox from '@/components/lib/SearchBox.vue'

import Vue from 'vue'
Vue.config.ignoredElements = [/^ion-/] // Allow ionicons

describe('Main logic - GalleryTable component', () => {
  it('renders titles when passed photos array as prop', async () => {
    const albumTitle = 'Displayable title'
    const photoTitle = 'A Photo'
    const wrapper = await shallowMount(GalleryTable, {
      propsData: {
        photos: [
          { id: 1, albumId: 1, albumTitle: 'Displayable title', title: 'A Photo', thumbnailUrl: 'testurl' }
        ],
        albums: []
      }
    })

    console.log(wrapper.text())

    expect(wrapper.text()).to.include(albumTitle)
    expect(wrapper.text()).to.include(photoTitle)
  })

  it('filters photos based on album search term', async () => {
    const wrapper = mount(GalleryTable, {
      propsData: {
        photos: [
          { id: 1, albumId: 1, albumTitle: 'Displayable title Dont find', title: 'A Photo', thumbnailUrl: 'https://via.placeholder.com/150/92c952' },
          { id: 2, albumId: 1, albumTitle: 'Search my album', title: 'A Second Photo', thumbnailUrl: 'https://via.placeholder.com/150/92c952' }
        ],
        albums: []
      }
    })

    const textInputComponent = wrapper.findComponent(SearchBox)
    await textInputComponent.vm.$emit('input', 'Search my')

    expect(wrapper.text()).to.include('Search my')
    expect(wrapper.text()).not.to.include('Dont find')
  })
})
