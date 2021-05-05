<template>
  <div>
    <div class="row">
      <div class="col text-center pt-2">
        <button type="button" class="btn btn-primary" @click="showModal = true">Open modal</button>
      </div>
    </div>

    <Modal v-model="showModal" title="Vertically centered modal" wrapper-class="modal-wrapper">
      <p>Placeholder text for this demonstration of a vertically centered modal dialog.</p>
      <div class="row">
        <div class="col-sm-12">
          <div class="float-right">
            <button class="btn btn-secondary" type="button" @click="showModal = false">Close</button>
          </div>
        </div>
      </div>
    </Modal>
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

<style>
.modal-wrapper {
  display: flex;
  align-items: center;
}

.modal-wrapper .vm {
  top: auto;
}
</style>
