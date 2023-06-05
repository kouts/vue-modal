import Modal from '@/Modal.vue'
import { mount } from '@vue/test-utils'
import { sleep, waitRAF } from '../utils'

const createWrapper = () => {
  return mount(Modal, {
    attachTo: document.body,
    global: {
      stubs: {
        transition: false
      }
    },
    slots: {
      default: '<p>Modal content goes here...</p>'
    }
  })
}

describe('Modal events', () => {
  beforeEach(() => {
    document.body.innerHTML = ''
  })

  it.each(['before-open', 'opening', 'opened'])('emits a %s event when opening', async (eventName) => {
    const wrapper = createWrapper()

    await wrapper.setProps({ modelValue: true })
    await waitRAF()
    await sleep(200)
    expect(wrapper.emitted()[eventName]).toBeTruthy()
    wrapper.unmount()
  })

  it.each(['before-close', 'closing', 'closed'])('emits a %s event when closing', async (eventName) => {
    const wrapper = createWrapper()

    await wrapper.setProps({ modelValue: true })
    await waitRAF()
    await wrapper.setProps({ modelValue: false })
    await waitRAF()
    await sleep(200)
    expect(wrapper.emitted()[eventName]).toBeTruthy()
    wrapper.unmount()
  })
})
