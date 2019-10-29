<template>
  <div v-if="mount">
    <portal :selector="appendTo">
      <transition
        name="custom-modal-backdrop-transition"
        :enter-active-class="bgInClass"
        :leave-active-class="bgOutClass"
      >
        <div v-show="show" :class="['modal-backdrop', 'backdrop-'+modalId ]" :style="{ 'z-index': zIndex-1 }"></div>
      </transition>
      <transition
        name="custom-modal-transition"
        :enter-active-class="inClass"
        :leave-active-class="outClass"
        @before-enter="beforeOpen"
        @enter="opening"
        @after-enter="afterOpen"
        @before-leave="beforeClose"
        @leave="closing"
        @after-leave="afterClose"
      >
        <div 
          ref="modal-wrapper"
          tabindex="0" 
          v-show="show" 
          :class="['modal-wrapper', wrapperClass, baseAnimClass, animClass, modalId]" 
          :style="{ 'z-index': zIndex, cursor: enableClose ? 'pointer' : 'default' }"
          @click="clickOutside($event)"
          @keydown="keydown($event)"
        >
          <div ref="modal" :class="['modal', cssClass]" :style="cssStyle" role="dialog" :aria-label="title" aria-modal="true">
            <slot name="modal-titlebar">
              <div class="modal-titlebar">
                <h3 class="modal-title">{{title}}</h3> <button v-if="enableClose" class="modal-btn-close" type="button" @click.prevent="close"></button>
              </div>
            </slot>
            <slot name="modal-content">
              <div class="modal-content">
                <slot></slot>
              </div>
            </slot>
          </div>
        </div>
      </transition>
    </portal>
  </div>
</template>

<script>
import { Portal } from '@linusborg/vue-simple-portal';

export default {
  name: 'Modal',
  components: {
    Portal
  },
  data: function() {
    return {
      zIndex: 0,
      modalId: null,
      show: false,
      mount: false,
      elToFocus: null,
    };
  },
  props: {
    basedOn: {
      type: Boolean,
      default: false
    },
    live: {
      type: Boolean,
      default: false
    },    
    title: {
      type: String
    },
    enableClose: {
      type: Boolean,
      default: true      
    },
    baseZindex: {
      type: Number,
      default: 1051      
    },
    baseAnimClass: {
      type: String
    },
    wrapperClass: {
      type: String
    },
    cssClass: {
      type: String
    },
    cssStyle: {
      type: Object
    },    
    animClass: {
      type: String
    },
    inClass: {
      type: String,
      default: 'modal-fadeIn'
    },
    outClass: {
      type: String,
      default: 'modal-fadeOut'
    },    
    bgInClass: {
      type: String,
      default: 'modal-fadeIn'
    },
    bgOutClass: {
      type: String,
      default: 'modal-fadeOut'
    },    
    bgClass: {
      type: String
    },
    bgAnimClass: {
      type: String
    },
    appendTo: {
      type: String,
      default: 'body'
    }    
  },
  model: {
    prop: 'basedOn',
    event: 'changed'
  },  
  methods: {
    close(){
      if (this.enableClose === true){
        this.$emit('changed', false);
      }
    },
    clickOutside(e){
      if (e.target === this.$refs['modal-wrapper']){
        this.close();
      }
    },
    keydown: function(e){
      if (e.which === 27){
        this.close();
      }
      if (e.which === 9){
        // Get only visible elements
        let all = [].slice.call(this.$refs['modal-wrapper'].querySelectorAll('input, select, textarea, button, a'));
        all = all.filter(function(el){
          return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        });
        if (e.shiftKey){
          if (e.target === all[0] || e.target === this.$refs['modal-wrapper']){
            e.preventDefault();
            all[all.length - 1].focus();
          }
        } else {
          if (e.target === all[all.length - 1]){
            e.preventDefault();
            all[0].focus();
          }
        }
      }
    },
    getTopZindex(){
      let toret = 0;
      let all = document.querySelectorAll('.modal-wrapper');
      for (let i = 0; i < all.length; i++) {
        if (all[i].display === 'none'){
          continue;
        }
        toret = parseInt(all[i].style.zIndex) > toret ? parseInt(all[i].style.zIndex) : toret;
      }
      return toret;
    },
    modalsVisible(){
      let all = document.querySelectorAll('.modal-wrapper');
      // We cannot return false unless we make sure that there are not any modals visible
      let found_visible = 0;
      for (let i = 0; i < all.length; i++) {
        if (all[i].display === 'none'){
          continue;
        }
        if (parseInt(all[i].style.zIndex) > 0){
          found_visible++;
        }
      }
      return found_visible;
    },
    handleFocus(modalWrapper){
      let autofocus = modalWrapper.querySelector('[autofocus]');
      if(autofocus){
        autofocus.focus();
      } else {
        let focusable = modalWrapper.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        focusable.length ? focusable[0].focus() : modalWrapper.focus();
      }
    },
    beforeOpen(){
      // console.log('beforeOpen');
      this.elToFocus = document.activeElement;
      let lastZindex = this.getTopZindex();
      this.zIndex = (lastZindex === 0) ? this.baseZindex : lastZindex + 2;
      this.$emit('beforeOpen');
    },
    opening(){
      // console.log('opening');
      this.$emit('opening');
    },
    afterOpen(){
      // console.log('afterOpen');
      this.handleFocus(this.$refs['modal-wrapper']);
      this.$emit('afterOpen');
    },
    beforeClose(){
      // console.log('beforeClose');
      this.$emit('beforeClose');
    },
    closing(){
      // console.log('closing');
      this.$emit('closing');
    },
    afterClose(){
      // console.log('afterClose');
      this.zIndex = 0;
      if (!this.live){
        this.mount = false;
      }
      this.$nextTick(() => {
        window.requestAnimationFrame(()=> {
          let lastZindex = this.getTopZindex();
          if (lastZindex > 0){
            let all = document.querySelectorAll('.modal-wrapper');
            for (let i = 0; i < all.length; i++) {
              let modalWrapper = all[i];
              if (modalWrapper.display === 'none'){
                continue;
              }
              if (parseInt(modalWrapper.style.zIndex) === lastZindex){
                if (modalWrapper.contains(this.elToFocus)){
                  this.elToFocus.focus();
                } else {
                  // console.log(modalWrapper);
                  this.handleFocus(modalWrapper);
                }
                break;
              }
            }
          } else {
            if (document.body.contains(this.elToFocus)){
              this.elToFocus.focus();
            }
          }
          this.$emit('afterClose');
        });
      });
    }
  },
  created(){
    if (this.live){
      this.mount = true;
    }
  },
  mounted(){
    this.modalId = this._uid + '_modal';
    this.$watch('basedOn', function(newVal){
      if (newVal){
        this.mount = true;
        this.$nextTick(() => {
          this.show = true;
        });
      } else {
        this.show = false;
      }
    }, {
      immediate: true
    });
  },
  beforeDestroy(){
    this.elToFocus = null;
  }
};
</script>

<style>
  .modal-backdrop {position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0, 0, 0, 0.5);}
  .modal-wrapper {position: fixed; top: 0; right: 0; bottom: 0; left: 0; overflow-x: hidden; overflow-y: auto; outline: 0;}
  .modal {position: relative; margin: 0px auto; width: calc(100% - 20px); min-width: 110px; max-width:100%; color: $body-color; background-color: #fff; top:30px; cursor: default; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);}
  .modal-titlebar {padding:10px 15px 10px 15px; color: $body-color; overflow: auto; border-bottom: 1px solid #e5e5e5;}
  .modal-title {margin-top:2px; margin-bottom: 0px; display: inline-block; font-size:18px; font-weight: normal;}
  .modal-btn-close {color: #ccc; padding: 0px; cursor: pointer;  background: 0 0; border: 0; float: right; font-size: 24px; line-height: 1em; color:#ccc;}
  .modal-btn-close:before {content: '×'; font-family: Arial;}
  .modal-btn-close:hover, .modal-btn-close:focus, .modal-btn-close:focus:hover{color:#bbb; border-color: transparent; background-color: transparent;}
  .modal-content {padding:10px 15px 15px 15px;}
  .modal-content .full-hr {width: auto; border: 0; border-top: 1px solid #e5e5e5; margin-top:15px; margin-bottom:15px; margin-left:-14px; margin-right:-14px;}
  .modal-fadeIn {animation-name: modal-fadeIn;} 
  @keyframes modal-fadeIn {0% {opacity: 0} 100% {opacity: 1}}
  .modal-fadeOut {animation-name: modal-fadeOut;} 
  @keyframes modal-fadeOut {0% {opacity: 1} 100% {opacity: 0}}
  .modal-fadeIn, .modal-fadeOut {animation-duration: .25s; animation-fill-mode: both;}
</style>