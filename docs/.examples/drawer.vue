<template>
  <div>
    <div class="row">
      <div class="col">
        <button type="button" class="btn btn-primary" @click="showDrawer = true">Open a drawer</button>
      </div>
    </div>

    <Modal
      v-model="showDrawer"
      title="Drawer"
      wrapper-class="animate__animated"
      modal-class="drawer"
      in-class="animate__fadeInRight"
      out-class="animate__fadeOutRight"
    >
      <form novalidate>
        <div class="form-group">
          <label for="inputEmail4">Email</label>
          <input id="inputEmail4" type="email" class="form-control" placeholder="Email" />
        </div>
        <div class="form-group">
          <label for="inputAddress">Address</label>
          <input id="inputAddress" type="text" class="form-control" placeholder="1234 Main St" />
        </div>
        <div class="form-group">
          <label for="inputAddress2">Address 2</label>
          <input id="inputAddress2" type="text" class="form-control" placeholder="Apartment, studio, or floor" />
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputCity">City</label>
            <input id="inputCity" type="text" class="form-control" />
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
            <input id="inputZip" type="text" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <div class="form-check">
            <input id="gridCheck" class="form-check-input" type="checkbox" />
            <label class="form-check-label" for="gridCheck"> Check me out </label>
          </div>
        </div>
        <div class="row modal-footer">
          <div class="col-sm-12">
            <div class="float-right">
              <button class="btn btn-primary" type="button" @click="showDrawer = false">Ok</button>
              <button class="btn btn-secondary ml-2" type="button" @click="showDrawer = false">Cancel</button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDrawer: false
    }
  }
}
</script>

<style>
@import '~animate.css/animate.css';

.vm.drawer {
  top: 0px;
  margin: 0px 0px 0px auto;
  height: 100%;
  width: 100%;
  max-width: 750px;
}

.vm-content {
  background: #fff;
}

.modal-footer {
  padding: 15px 0px 0px 0px;
  border-top: 1px solid #e5e5e5;
  margin-left: -14px;
  margin-right: -14px;
}
</style>
