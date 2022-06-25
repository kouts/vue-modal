import Modal from '@/Modal.vue'
import { mount } from '@vue/test-utils'
import { waitRAF } from '../utils'

const createWrapperContainer = (componentArgs) => {
  const args = componentArgs || {}

  args.appendTo = '#modal-host'
  const wrapperContainer = {
    components: {
      Modal
    },
    data() {
      return {
        showModal: false,
        args
      }
    },
    template: `
      <div id="modal-host"></div>
      <Modal v-model="showModal" v-bind="args"><p>Modal content goes here...</p></Modal>
    `
  }

  return mount(wrapperContainer, {
    attachTo: document.body,
    global: {
      stubs: {
        transition: false
      }
    }
  })
}

describe('Modal basic functionality', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it('shows the modal', async () => {
    const wrapper = createWrapperContainer()

    expect(wrapper.find('.vm').exists()).toBe(false)

    await wrapper.setData({ showModal: true })

    expect(wrapper.find('.vm').exists()).toBe(true)

    wrapper.unmount()
  })

  it('hides the modal', async () => {
    const wrapper = createWrapperContainer()

    await wrapper.setData({ modelValue: true })
    await wrapper.setData({ modelValue: false })

    expect(wrapper.find('.vm').exists()).toBe(false)

    wrapper.unmount()
  })

  it('tests whether the backdrop and the modal have the right z-index', async () => {
    const wrapper = createWrapperContainer({
      baseZindex: 1052
    })

    await wrapper.setData({
      showModal: true
    })
    await waitRAF()

    const backdrop = wrapper.find('.vm-backdrop')
    const modal = wrapper.find('.vm-wrapper')

    expect(backdrop.attributes().style).toEqual('z-index: 1051;')
    expect(modal.attributes().style).toContain('z-index: 1052;')

    wrapper.unmount()
  })
})
