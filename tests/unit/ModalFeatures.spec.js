import Modal from '@/Modal.vue'
import { mount } from '@vue/test-utils'
import { sleep, waitNT } from '../utils'

const originalOffsetHeight = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetHeight')
const originalOffsetWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'offsetWidth')

const ModalParent = {
  template: `
  <div>
    <button type="button" class="open-modal-1" @click="showModal1 = true">Open modal 1</button>
    <Modal1 wrapperClass="modal-1" v-model="showModal1" :title="title" :live="live">
      <div>
        <input v-if="showInput" type="text" value="" autofocus class="text-input" />
        <button type="button" class="open-modal-2" @click="showModal2 = true">Open modal 2</button>
        <a href="#">Link</a>
        <input type="checkbox" value="" class="checkbox-input" />
      </div>
    </Modal1>

    <Modal2 title="modal-2" wrapperClass="modal-2" v-model="showModal2"><div>Modal content 2</div></Modal2>
  </div>
  `,
  components: {
    Modal1: Modal,
    Modal2: Modal
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
    components: {
      Modal1: Modal,
      Modal2: Modal
    },
    attachTo: '#modal-host',
    global: {
      stubs: {
        transition: false
      }
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
  beforeEach(() => {
    const el = document.createElement('div')

    el.id = 'modal-host'
    document.body.appendChild(el)
  })

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

    const modal1 = wrapper.getComponent('.modal-1')

    expect(modal1.element.getAttribute('aria-label')).toBe('Test title')
    wrapper.unmount()
  })

  it('focuses on the element with autofocus attribute set', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('button.open-modal-1').trigger('click')

    await sleep(100)

    const textInput = wrapper.getComponent('.modal-1').find('.modal-1 .text-input')

    expect(document.activeElement).toEqual(textInput.element)
    wrapper.unmount()
  })

  it('focuses an element in the previous opened modal', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('button.open-modal-1').trigger('click')

    await sleep(300)

    const modal1 = wrapper.getComponent('.modal-1')

    await modal1.find('button.open-modal-2').trigger('click')

    await sleep(300)

    const modal2 = wrapper.getComponent('.modal-2')

    await modal2.find('.modal-2 button.vm-btn-close').trigger('click')

    await sleep(300)

    const textInput = modal1.find('.modal-1 .text-input')

    expect(document.activeElement).toEqual(textInput.element)
    wrapper.unmount()
  })

  it('focuses another element', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('button.open-modal-1').trigger('click')

    await sleep(100)

    const modal1 = wrapper.getComponent('.modal-1')

    await modal1.find('button.open-modal-2').trigger('click')

    await sleep(100)

    wrapper.setProps({ showInput: false })

    const modal2 = wrapper.getComponent('.modal-2')

    await modal2.find('.modal-2 button.vm-btn-close').trigger('click')

    await sleep(100)

    const closeBtn = modal1.find('.modal-1 button.vm-btn-close')

    expect(document.activeElement).toEqual(closeBtn.element)
    wrapper.unmount()
  })

  it('tab works', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('.open-modal-1').trigger('click')

    await sleep(100)

    const modal1 = wrapper.getComponent('.modal-1')

    await modal1.trigger('keydown', { keyCode: 9 })

    const textInput = modal1.find('.modal-1 .text-input')

    expect(document.activeElement).toBe(textInput.element)
    wrapper.unmount()
  })

  it('shift tab works', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('.open-modal-1').trigger('click')

    await sleep(100)

    const modal1 = wrapper.getComponent('.modal-1')

    await modal1.trigger('keydown', {
      keyCode: 9,
      shiftKey: true
    })

    const checkboxInput = modal1.find('.modal-1 .checkbox-input')

    expect(document.activeElement).toBe(checkboxInput.element)
    wrapper.unmount()
  })

  it('closes with the esc key', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('.open-modal-1').trigger('click')

    await sleep(100)

    const modal1 = wrapper.getComponent('.modal-1')

    await modal1.trigger('keydown', { keyCode: 27 })

    await sleep(100)

    expect(wrapper.find('.vm-wrapper').exists()).not.toBeTruthy()
    wrapper.unmount()
  })

  it('click outside works', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('.open-modal-1').trigger('click')

    await sleep(100)

    const modal1 = wrapper.getComponent('.modal-1')

    await modal1.trigger('click')

    await sleep(100)

    expect(wrapper.find('.vm-wrapper').exists()).not.toBeTruthy()
    wrapper.unmount()
  })

  it('stays in DOM with live mode', async () => {
    const wrapper = createModalsWrapper({
      live: true
    })

    await waitNT(wrapper.vm)

    await wrapper.find('.open-modal-1').trigger('click')

    await sleep(100)

    const modal1 = wrapper.getComponent('.modal-1')
    const modal1Backdrop = wrapper.getComponent('.vm-backdrop')

    await modal1.find('.vm-btn-close').trigger('click')

    await sleep(100)

    expect(modal1.exists()).toBeTruthy()
    expect(modal1.isVisible()).toBe(false)

    expect(modal1Backdrop.exists()).toBeTruthy()
    expect(modal1Backdrop.isVisible()).toBe(false)
    wrapper.unmount()
  })

  it('tab cycles through focusable elements', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('.open-modal-1').trigger('click')

    await sleep(100)

    const modal1 = wrapper.getComponent('.modal-1')

    await modal1.find('.modal-1 .checkbox-input').trigger('keydown', { keyCode: 9 })

    const closeBtn = modal1.find('.modal-1 button.vm-btn-close')

    expect(document.activeElement).toEqual(closeBtn.element)
    wrapper.unmount()
  })

  it('returns focus on the element that triggered the modal', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('.open-modal-1').trigger('click')

    await sleep(100)

    const modal1 = wrapper.getComponent('.modal-1')

    await modal1.find('.modal-1 button.vm-btn-close').trigger('click')

    await sleep(100)

    expect(document.activeElement).toEqual(document.body)
    wrapper.unmount()
  })

  it('stacks the modals correctly', async () => {
    const wrapper = createModalsWrapper()

    await wrapper.find('button.open-modal-1').trigger('click')

    await sleep(100)

    const modal1 = wrapper.getComponent('.modal-1')

    await modal1.find('button.open-modal-2').trigger('click')

    await sleep(100)

    const modal2 = wrapper.getComponent('.modal-2')

    expect(modal2.element.style.zIndex).toBe('1053')

    wrapper.unmount()
  })
})
