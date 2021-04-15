<template>
  <div>
    <div class="row">
      <div class="col-sm-6">
        <div class="form-group">
          <label>Modal size</label>
          <select class="custom-select" v-model="modalClass">
            <option 
              v-for="size in modalClasses" 
              :key="size.value" 
              :value="size.value"
            >
              {{ size.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col text-center pt-2">
        <button type="button" class="btn btn-primary" @click="showModal = true">
          Open modal
        </button>
      </div>
    </div>

    <Modal
      v-model="showModal"
      :title="`Modal size: ${modalClasses.find(m => m.value === modalClass).text}`"
      :modal-class="`modal ${modalClass}`"
    >
      <div class="bd-example-row py-3 px-4">
        <div class="row">
          <div class="col-md-8">.col-md-8</div>
          <div class="col-md-4">.col-md-4</div>
        </div>

        <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop -->
        <div class="row">
          <div class="col-6 col-md-4">.col-6 .col-md-4</div>
          <div class="col-6 col-md-4">.col-6 .col-md-4</div>
          <div class="col-6 col-md-4">.col-6 .col-md-4</div>
        </div>

        <!-- Columns are always 50% wide, on mobile and desktop -->
        <div class="row">
          <div class="col-6">.col-6</div>
          <div class="col-6">.col-6</div>
        </div>
      </div>
      <hr class="full-hr" />
      <div class="row scrollable-modal-footer">
        <div class="col-sm-12">
          <div class="float-right">
            <button
              class="btn btn-secondary ml-2"
              type="button"
              @click="showModal = false"
            >
              Close
            </button>
          </div>
        </div>
      </div>      
    </Modal>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      showModal: false,
      modalClass: '',
      modalClasses: [
        {
          value: 'modal-sm',
          text: 'Small'
        },
        {
          value: '',
          text: 'Medium'
        },
        {
          value: 'modal-lg',
          text: 'Large'
        },
        {
          value: 'modal-xl',
          text: 'Extra large'
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.modal {
  min-width: 300px;
}

@media (min-width: 480px) {
  .modal-sm {
    max-width: 300px;
  }
}

@media (min-width: 992px) {
  .modal-lg,
  .modal-xl {
    max-width: 800px;
  }
}

@media (min-width: 1200px) {
  .modal-xl {
    max-width: 1140px;
  }
}
</style>
