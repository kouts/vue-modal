<template>
  <div class="mt-3">
    <div class="row mb-3">
      <div class="col">
        <button type="button" class="btn btn-primary" @click="$modal.show('myModal')">Open a modal</button>
      </div>
    </div>

    <ClientOnly>
      <Modal name="myModal" title="My first modal">
        <p>Modal content goes here...</p>
      </Modal>
    </ClientOnly>
  </div>
</template>
