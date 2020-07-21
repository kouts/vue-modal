import { mount } from '@vue/test-utils';
import '@testing-library/jest-dom';
import { waitNT, waitRAF } from '../utils';
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
    wrapper.setData({ showModal: true });
    // console.log(document.body.innerHTML);
    await waitNT(wrapper.vm);
    await waitRAF();
    await waitNT(wrapper.vm);
    await waitRAF();
    expect(document.querySelector('.vm')).toBeInstanceOf(HTMLElement);
  });

  it('hides a modal', async () => {
    wrapper.setData({ showModal: false });
    await waitNT(wrapper.vm);
    await waitRAF();
    await waitNT(wrapper.vm);
    await waitRAF();
    expect(document.querySelector('.vm')).toBeFalsy();
  });
});
