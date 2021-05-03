import { mount } from '@vue/test-utils'
import '@testing-library/jest-dom'
import { waitNT, waitRAF, sleep } from '../utils'
import Modal from '@/Modal.vue'

describe('Modal basic functionality', () => {
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

  it('shows a modal', async () => {
    wrapper.setProps({ basedOn: true })
    // console.log(document.body.innerHTML);
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.querySelector('.vm')).toBeInstanceOf(HTMLElement)
  })

  it('hides a modal', async () => {
    wrapper.setProps({ basedOn: false })
    await waitNT(wrapper.vm)
    await waitRAF()
    await sleep(200)
    expect(document.querySelector('.vm')).toBeFalsy()
  })

  it('tests whether the backdrop and the modal have the right z-index', async () => {
    await waitNT(wrapper.vm)
    await waitRAF()
    wrapper.setProps({
      basedOn: true,
      baseZindex: 1051
    })
    // console.log(document.body.innerHTML);
    await waitNT(wrapper.vm)
    await waitRAF()
    expect(document.querySelector('.vm-backdrop')).toHaveStyle('z-index: 1050;')
    expect(document.querySelector('.vm-wrapper')).toHaveStyle(`
      z-index: 1051;
      cursor: pointer;
    `)
  })
})
