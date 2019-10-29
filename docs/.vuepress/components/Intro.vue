<template>
  <div>
    <div class="row mb-3">
      <div class="col">
        <a href="#" @click="show_modal_1=true">
          Open a modal
        </a>
      </div>
    </div>

    <ClientOnly>
      <Modal v-model="show_modal_1" title="My first modal" cssClass="mw10">
        <form novalidate>
          <div class="form-group">
            <label for="inputEmail4">Email</label>
            <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
          </div>
          <div class="form-group">
            <label for="inputAddress">Address</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
          </div>
          <div class="form-group">
            <label for="inputAddress2">Address 2</label>
            <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCity">City</label>
              <input type="text" class="form-control" id="inputCity">
            </div>
            <div class="form-group col-md-4">
              <label for="inputState">State</label>
              <select id="inputState" class="form-control">
                <option selected>Choose...</option>
                <option>...</option>
              </select>
            </div>
            <div class="form-group col-md-2">
              <label for="inputZip">Zip</label>
              <input type="text" class="form-control" id="inputZip">
            </div>
          </div>
          <div class="form-group">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="gridCheck">
              <label class="form-check-label" for="gridCheck">
                Check me out
              </label>
            </div>
          </div>
          <hr class="full-hr">
          <div class="row">
            <div class="col-sm-12">
              <div class="float-right">
                <button class="btn btn-primary" type="button" @click="show_modal_1=false">Ok</button>
                <button class="btn btn-secondary ml-2" type="button" @click="show_modal_1=false">Cancel</button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </ClientOnly>
    
  </div>
</template>

<script>
  export default {
    name: 'Intro',
    data: function(){
      return {
        show_modal_1: false
      }
    }
  }
</script>