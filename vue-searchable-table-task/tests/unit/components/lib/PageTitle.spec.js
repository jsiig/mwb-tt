import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import PageTitle from '@/components/lib/PageTitle.vue'

describe('PageTitle component', () => {
  it('renders slot data when passed', () => {
    const msg = 'new title'
    const wrapper = shallowMount(PageTitle, {
      slots: {
        default: msg
      }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
