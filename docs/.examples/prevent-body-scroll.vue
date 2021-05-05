<template>
  <div>
    <div class="row">
      <div class="col text-center pt-2">
        <button type="button" class="btn btn-primary" @click="showModal = true">Open modal</button>
      </div>
    </div>

    <Modal v-model="showModal" title="Body freeze modal" @before-open="beforeOpen" @before-close="beforeClose">
      <p class="mb-0 text-center">
        This modal uses the built-in events of vue-modal and the<br />
        <a href="https://github.com/ramonvictor/body-scroll-freezer" target="_blank" rel="noopener"> body-scroll-freezer </a>
        plugin,<br />
        in order to stop <code>&lt;body&gt;</code> from scrolling.
      </p>
    </Modal>
  </div>
</template>

<script>
import bodyScroll from 'body-scroll-freezer'

export default {
  data: function () {
    return {
      showModal: false
    }
  },
  mounted() {
    bodyScroll.init()
  },
  methods: {
    beforeOpen() {
      bodyScroll.freeze()
    },
    beforeClose() {
      bodyScroll.unfreeze()
    }
  }
}
</script>
