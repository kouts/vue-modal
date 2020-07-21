import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import Modal from '@/Modal.vue';

describe('Modal', () => {
  const WrapperComponent = {
    data: function () {
      return {
        showModal: false
      };
    },
    template: `
    <Modal v-model="showModal" title="My first modal">
      <p>Modal content goes here...</p>
    </Modal>
    `,
    components: {
      Modal
    }
  };

  const wrapper = mount(WrapperComponent, {
    stubs: {
      transition: false
    }
  });

  it('shows a modal', async () => {
    await wrapper.setData({ showModal: true });
    // console.log(document.body.innerHTML);
    // const div = wrapper.find('div');
    // expect(div.exists()).toBe(true);
    expect(document.querySelector('.vm')).toBeInstanceOf(HTMLElement);
  });

  it('hides a modal', (done) => {
    wrapper.setData({ showModal: false });
    setTimeout(() => {
      expect(document.querySelector('.vm')).toBeFalsy();
      done();
    }, 750);
  });
});
