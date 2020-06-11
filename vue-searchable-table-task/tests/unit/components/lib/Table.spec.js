import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Table from '@/components/lib/Table.vue'

describe('Table component', () => {
  it('renders slot data when passed', () => {
    const msg = 'new title'
    const wrapper = shallowMount(Table, {
      slots: {
        default: `<tr><td>${msg}</td></tr>`
      }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
