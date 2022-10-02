<template>
  <div class="container">
    <div class="row mb-3">
      <div class="col">
        <button type="button" class="btn btn-primary" @click="showModal1 = true">Open a modal 1 (with basedOn)</button>
        <button type="button" class="btn btn-primary ml-2" @click="showModal2 = true">Open a modal 2 (with v-model)</button>
      </div>
    </div>

    <Modal :based-on="showModal1" title="My first modal" @close="showModal1 = false">
      <p>Modal 1 content goes here...</p>
    </Modal>

    <Modal v-model="showModal2" title="My first modal">
      <p>Modal 2 content goes here...</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'ViewsExample2',
  data: function () {
    return {
      showModal1: false,
      showModal2: false
    }
  }
}
</script>
