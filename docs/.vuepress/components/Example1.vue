<template>
  <div class="mt-3">
    <div class="row mb-3">
      <div class="col">
        <button type="button" class="btn btn-primary" @click="showModal = true">Open a modal</button>
      </div>
    </div>

    <ClientOnly>
      <Modal v-model="showModal" title="My first modal">
        <p>Modal content goes here...</p>
      </Modal>
    </ClientOnly>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      showModal: false
    }
  }
}
</script>
