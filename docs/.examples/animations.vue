<template>
  <div>
    <div class="row">
      <div class="col">
        <div class="form-group">
          <label>Modal intro</label>
          <select v-model="inClass" class="custom-select">
            <option v-for="animClass in inClasses" :key="animClass" :value="animClass">
              {{ animClass }}
            </option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label>Modal outro</label>
          <select v-model="outClass" class="custom-select">
            <option v-for="animClass in outClasses" :key="animClass" :value="animClass">
              {{ animClass }}
            </option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label>Background intro</label>
          <select v-model="bgInClass" class="custom-select">
            <option v-for="animClass in bgInClasses" :key="animClass" :value="animClass">
              {{ animClass }}
            </option>
          </select>
        </div>
      </div>
      <div class="col">
        <div class="form-group">
          <label>Background outro</label>
          <select v-model="bgOutClass" class="custom-select">
            <option v-for="animClass in bgOutClasses" :key="animClass" :value="animClass">
              {{ animClass }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col text-center pt-2">
        <button type="button" class="btn btn-primary" @click="showModal = true">Open an animated modal</button>
      </div>
    </div>

    <Modal
      v-model="showModal"
      title="Animated modal"
      wrapper-class="animate__animated"
      :in-class="`animate__${inClass}`"
      :out-class="`animate__${outClass}`"
      bg-class="animate__animated"
      :bg-in-class="`animate__${bgInClass}`"
      :bg-out-class="`animate__${bgOutClass}`"
    >
      <p class="text-center mt-3">
        This is a modal animated using CSS classes from <br />
        <a href="https://animate.style/" target="_blank" rel="noopener">Animate.css</a>
      </p>
    </Modal>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      showModal: false,
      inClass: 'backInDown',
      inClasses: ['backInDown', 'bounceIn', 'fadeInDown', 'fadeInUp'],
      outClass: 'backOutUp',
      outClasses: ['backOutUp', 'bounceOut', 'fadeOutDown', 'fadeOutUp'],
      bgInClass: 'fadeInUp',
      bgInClasses: ['bounceIn', 'fadeInDown', 'fadeInUp'],
      bgOutClass: 'fadeOutDown',
      bgOutClasses: ['bounceOut', 'fadeOutDown', 'fadeOutUp']
    }
  }
}
</script>

<style>
@import '~animate.css/animate.css';
</style>
