<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-primary" @click="$modal.show('modal1')">Open named modal 1</button>
        <button type="button" class="btn btn-primary ml-2" @click="$modal.show('modal2')">Open named modal 2</button>
      </div>
    </div>
    <div class="row mt-4">
      <div class="col">
        <pre>{{ $modal.state }}</pre>
      </div>
    </div>

    <Modal name="modal1" title="My first modal">
      <p>Modal 1 content goes here...</p>
      <p class="text-right mb-0" @click="$modal.hide('modal1')"><button class="btn btn-secondary">Close</button></p>
    </Modal>

    <Modal name="modal2" title="My second modal">
      <p>Modal 2 content goes here...</p>
    </Modal>
  </div>
</template>

<script>
export default {
  data: function () {
    return {}
  }
}
</script>
