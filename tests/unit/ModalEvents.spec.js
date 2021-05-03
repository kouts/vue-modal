import { mount } from '@vue/test-utils'
import '@testing-library/jest-dom'
import { waitNT, waitRAF, sleep } from '../utils'
import Modal from '@/Modal.vue'

describe('Modal events', () => {
  const wrapper = mount(Modal, {
    stubs: {
      transition: false
    },
    slots: {
      default: '<p>Modal content goes here...</p>'
    }
  })

  afterEach(() => {
    wrapper.setProps({
      basedOn: false
    })
  })

  it('emits a before-open event', async () => {
    wrapper.setProps({ basedOn: true })
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.emitted('before-open')).toBeTruthy()
  })

  it('emits an opening event', async () => {
    wrapper.setProps({ basedOn: true })
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.emitted('opening')).toBeTruthy()
  })

  it('emits an after-open event', async () => {
    wrapper.setProps({ basedOn: true })
    await waitNT(wrapper.vm)
    await waitRAF()
    await sleep(200)
    expect(wrapper.emitted('after-open')).toBeTruthy()
  })

  it('emits a before-close event', async () => {
    wrapper.setProps({ basedOn: false })
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.emitted('before-close')).toBeTruthy()
  })

  it('emits an closing event', async () => {
    wrapper.setProps({ basedOn: false })
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.emitted('closing')).toBeTruthy()
  })

  it('emits an after-close event', async () => {
    wrapper.setProps({ basedOn: false })
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(wrapper.emitted('after-close')).toBeTruthy()
  })
})
