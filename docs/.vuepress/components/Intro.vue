<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <a href="#" @click="show_modal_1=true">
          Open a modal
        </a>
      </div>
    </div>

    <Modal v-model="show_modal_1" title="Test modal title" cssClass="mw8">
      <div class="row">
        <div class="col-sm-12">
          <p>
            <label>Test field</label>
            <input type="text" class="form-control" value="" />
          </p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris a lorem suscipit orci vehicula aliquam. Sed varius urna nec nisl placerat convallis. Maecenas bibendum ante mi, in mattis nisl fringilla vitae. Duis sollicitudin est id purus venenatis tincidunt. Donec vitae nulla ac lorem tristique varius et in mauris. Aenean molestie dui eu mauris pretium iaculis. Phasellus varius mi in molestie congue. Nullam non ultrices libero.</p>
          <p><button type="button" class="btn btn-primary" @click="show_modal_2=true">Open second modal</button></p>
        </div>
      </div>
      <hr class="full-hr">
      <div class="row">
        <div class="col-sm-12">
          <div class="float-right"><button class="btn btn-secondary ml-2" type="button" @click="show_modal_1=false">Close</button></div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    data: function(){
      return {
        show_modal_1: false,
      }
    }
  }
</script>