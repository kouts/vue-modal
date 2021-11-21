import { mount } from '@vue/test-utils'
import { waitRAF, sleep } from '../utils'
import Modal from '@/Modal.vue'

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

  it.each(['before-open', 'opening', 'after-open'])('emits a %s event when opening', async (eventName) => {
    const wrapper = createWrapper()
    await wrapper.setProps({ modelValue: true })
    await waitRAF()
    await sleep(200)
    expect(wrapper.emitted()[eventName]).toBeTruthy()
    wrapper.unmount()
  })

  it.each(['before-close', 'closing', 'after-close'])('emits a %s event when closing', async (eventName) => {
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
