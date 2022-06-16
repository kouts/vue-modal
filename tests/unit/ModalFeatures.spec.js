import Modal from '@/Modal.vue'
import { mount } from '@vue/test-utils'
import { sleep, waitNT } from '../utils'

const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')

const PortalStub = {
  template: '<div class="portal"><slot></slot></div>'
}

const ModalParent = {
  template: `
  <div>
    <button type="button" class="open-modal-1" @click="showModal1 = true">Open modal 1</button>
    <Modal wrapperClass="modal-1" v-model="showModal1" :title="title" :live="live">
      <div>
        <input v-if="showInput" type="text" value="" autofocus class="text-input" />
        <button type="button" class="open-modal-2" @click="showModal2 = true">Open modal 2</button>
        <a href="#">Link</a>
        <input type="checkbox" value="" class="checkbox-input" />
      </div>
    </Modal>

    <Modal title="modal-2" wrapperClass="modal-2" v-model="showModal2"><div>Modal content 2</div></Modal>
    <div class="modal-anchor"></div>
  </div>
  `,
  components: {
    Modal
  },
  props: {
    showInput: {
      type: Boolean,
      default: true
    }
  }
}

const createModalsWrapper = (data) => {
  return mount(ModalParent, {
    attachTo: document.body,
    stubs: {
      transition: false,
      portal: PortalStub
    },
    data() {
      return {
        ...{
          live: false,
          title: 'Test title',
          showModal1: false,
          showModal2: false
        },
        ...data
      }
    }
  })
}

beforeAll(() => {
  const style = document.createElement('style')

  style.innerHTML = `
  .vm-fadeIn, .vm-fadeOut {
    animation-duration: 1ms;
  }
  `
  document.head.appendChild(style)
})

describe('Modal features', () => {
  afterEach(() => {
    document.body.innerHTML = ''
  })

  beforeAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', { configurable: true, value: 500 })
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', { configurable: true, value: 500 })
  })

  afterAll(() => {
    Object.defineProperty(HTMLElement.prototype, 'offsetHeight', originalOffsetHeight)
    Object.defineProperty(HTMLElement.prototype, 'offsetWidth', originalOffsetWidth)
  })

  it('shows a modal with the correct tile', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('button.open-modal-1').trigger('click')

    await sleep(100)

    const vmWrapper = wrapper.find('.vm-wrapper')

    expect(vmWrapper.element.getAttribute('aria-label')).toBe('Test title')
    wrapper.destroy()
  })

  it('focuses on the element with autofocus attribute set', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('button.open-modal-1').trigger('click')

    await sleep(100)

    const textInput = wrapper.find('.modal-1 .text-input')

    expect(document.activeElement).toEqual(textInput.element)
    wrapper.destroy()
  })

  it('focuses an element in the previous opened modal', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('button.open-modal-1').trigger('click')

    await sleep(100)

    await wrapper.find('button.open-modal-2').trigger('click')

    await sleep(100)

    await wrapper.find('.modal-2 button.vm-btn-close').trigger('click')

    await sleep(100)

    const textInput = wrapper.find('.modal-1 .text-input')

    expect(document.activeElement).toEqual(textInput.element)
    wrapper.destroy()
  })

  it('focuses another element', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('button.open-modal-1').trigger('click')

    await sleep(100)

    await wrapper.find('button.open-modal-2').trigger('click')

    await sleep(100)

    wrapper.setProps({ showInput: false })

    await wrapper.find('.modal-2 button.vm-btn-close').trigger('click')

    await sleep(100)

    const closeBtn = wrapper.find('.modal-1 button.vm-btn-close')

    expect(document.activeElement).toEqual(closeBtn.element)
    wrapper.destroy()
  })

  it('tab works', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('.open-modal-1').trigger('click')

    await sleep(100)

    await wrapper.find('.modal-1').trigger('keydown', { keyCode: 9 })

    const textInput = wrapper.find('.modal-1 .text-input')

    expect(document.activeElement).toBe(textInput.element)
    wrapper.destroy()
  })

  it('shift tab works', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('.open-modal-1').trigger('click')

    await sleep(100)

    await wrapper.find('.modal-1').trigger('keydown', {
      keyCode: 9,
      shiftKey: true
    })

    const checkboxInput = wrapper.find('.modal-1 .checkbox-input')

    expect(document.activeElement).toBe(checkboxInput.element)
    wrapper.destroy()
  })

  it('closes with the esc key', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('.open-modal-1').trigger('click')

    await sleep(100)

    await wrapper.find('.modal-1').trigger('keydown', { keyCode: 27 })

    await sleep(100)

    expect(wrapper.find('.vm-wrapper').exists()).not.toBeTruthy()
    wrapper.destroy()
  })

  it('click outside works', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('.open-modal-1').trigger('click')

    await sleep(100)

    await wrapper.find('.vm-wrapper').trigger('click')

    await sleep(100)

    expect(wrapper.find('.vm-wrapper').exists()).not.toBeTruthy()
    wrapper.destroy()
  })

  it('stays in DOM with live mode', async () => {
    const wrapper = createModalsWrapper({
      live: true
    })

    await waitNT(wrapper.vm)

    await wrapper.find('.open-modal-1').trigger('click')

    await sleep(100)

    await wrapper.find('.vm-btn-close').trigger('click')

    await sleep(100)

    expect(wrapper.find('.vm-wrapper').exists()).toBeTruthy()
    expect(wrapper.find('.vm-wrapper').isVisible()).toBe(false)

    expect(wrapper.find('.vm-backdrop').exists()).toBeTruthy()
    expect(wrapper.find('.vm-backdrop').isVisible()).toBe(false)
    wrapper.destroy()
  })

  it('tab cycles through focusable elements', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('.open-modal-1').trigger('click')

    await sleep(100)

    await wrapper.find('.modal-1 .checkbox-input').trigger('keydown', { keyCode: 9 })

    const closeBtn = wrapper.find('.modal-1 button.vm-btn-close')

    expect(document.activeElement).toEqual(closeBtn.element)
    wrapper.destroy()
  })

  it('returns focus on the element that triggered the modal', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('.open-modal-1').trigger('click')

    await sleep(100)

    await wrapper.find('.modal-1 button.vm-btn-close').trigger('click')

    await sleep(100)

    expect(document.activeElement).toEqual(document.body)
    wrapper.destroy()
  })

  it('stacks the modals correctly', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('button.open-modal-1').trigger('click')

    await sleep(100)

    await wrapper.find('button.open-modal-2').trigger('click')

    const modal2 = wrapper.find('.vm-wrapper.modal-2')

    expect(modal2.element.style.zIndex).toBe('0')

    await sleep(100)

    expect(modal2.element.style.zIndex).toBe('1053')

    wrapper.destroy()
  })
})
