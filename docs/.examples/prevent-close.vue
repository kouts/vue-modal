<template>
  <div>
    <div class="row">
      <div class="col text-center pt-2">
        <button
          type="button"
          class="btn btn-primary"
          @click="
            showModal = true
            enableClose = false
          "
        >
          Open unclosable modal
        </button>
      </div>
    </div>

    <Modal v-model="showModal" :title="enableClose ? 'Closable modal' : 'Unclosable modal'" :enable-close="enableClose">
      <div class="row">
        <div v-if="!enableClose" class="col">
          <div class="alert alert-warning mt-1" role="alert">
            <p class="mb-1"><strong>WARNING: </strong></p>
            This modal cannot be closed!
          </div>
          <p>You can make the modal closable again, by clicking on the button below.</p>
        </div>
        <div v-else class="col">
          <p>The modal is now closable by clicking on the upper right "x", the overlay or the <code>esc</code> key</p>
        </div>
      </div>

      <button
        type="button"
        :class="['btn btn-secondary', enableClose ? 'btn-danger' : 'btn-success']"
        @click="enableClose = !enableClose"
      >
        {{ enableClose ? 'Disable' : 'Enable' }} closing
      </button>
    </Modal>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      showModal: false,
      enableClose: false
    }
  }
}
</script>
