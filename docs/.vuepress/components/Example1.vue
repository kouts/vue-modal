<template>
  <div class="mt-3">
    <div class="row mb-3">
      <div class="col">
        <button type="button" class="btn btn-primary" @click="show_modal_1=true">
          Open a modal
        </button>
      </div>
    </div>

    <ClientOnly>
      <Modal v-model="show_modal_1" title="My first modal" cssClass="mw10">
        <p>Modal content goes here...</p>
      </Modal>
    </ClientOnly>
    
  </div>
</template>

<script>
  export default {
    name: 'Example1',
    data: function(){
      return {
        show_modal_1: false
      }
    }
  }
</script>