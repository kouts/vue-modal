<template>
  <div v-if="mount">
    <portal>
      <transition
        name="custom-popup-backdrop-transition"
        :enter-active-class="bgInClass"
        :leave-active-class="bgOutClass"
      >
        <div v-show="show" :class="['popup-backdrop', 'backdrop-'+modalId ]" :style="{ 'z-index': zIndex-1 }"></div>
      </transition>
      <transition
        name="custom-popup-transition"
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
          ref="popup-wrapper"
          role="dialog" 
          tabindex="0" 
          v-show="show" 
          :class="['popup-wrapper', wrapperClass, baseAnimClass, animClass, modalId]" 
          :aria-label="title" 
          :style="{ opacity: 1, display: 'block', 'z-index': zIndex, cursor: enableClose ? 'pointer' : 'default' }"
          @click.prevent="clickOutside($event)"
          @keydown="keydown($event)"
        >
          <div ref="popup" :class="['popup', cssClass]" :style="cssStyle">
            <div class="popup-titlebar">
              <h3 class="popup-title">{{title}}</h3> <button v-if="enableClose" class="popup-btn-close" type="button" @click.prevent="close"><i class="fa fa-times"></i></button>
            </div>
            <div class="popup-content">
              <slot></slot>
            </div>
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
      mount: false
    };
  },
  elToFocus: null,
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
      default: 'popup-fadeIn'
    },
    outClass: {
      type: String,
      default: 'popup-fadeOut'
    },    
    bgInClass: {
      type: String,
      default: 'popup-fadeIn'
    },
    bgOutClass: {
      type: String,
      default: 'popup-fadeOut'
    },    
    bgClass: {
      type: String
    },
    bgAnimClass: {
      type: String
    }
  },
  methods: {
    close(){
      if (this.enableClose === true){
        this.$emit('doClose');
      }
    },
    clickOutside(e){
      if (e.target === this.$refs['popup-wrapper']){
        this.close();
      }
    },
    keydown: function(e){
      if (e.which === 27){
        this.close();
      }
      if (e.which === 9){
        // Get only visible elements
        let all = [].slice.call(this.$refs['popup-wrapper'].querySelectorAll('input, select, textarea, button, a'));
        all = all.filter(function(el){
          return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        });
        if (e.shiftKey){
          if (e.target === all[0] || e.target === this.$refs['popup-wrapper']){
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
      let all = document.querySelectorAll('.popup-wrapper');
      for (let i = 0; i < all.length; i++) {
        if (all[i].display === 'none'){
          continue;
        }
        toret = parseInt(all[i].style.zIndex) > toret ? parseInt(all[i].style.zIndex) : toret;
      }
      return toret;
    },
    popupsVisible(){
      let all = document.querySelectorAll('.popup-wrapper');
      // We cannot return false unless we make sure that there are not any popups visible
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
      this.$refs['popup-wrapper'].querySelector('[autofocus]') ? this.$refs['popup-wrapper'].querySelector('[autofocus]').focus() : this.$refs['popup-wrapper'].focus();
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
            let all = document.querySelectorAll('.popup-wrapper');
            for (let i = 0; i < all.length; i++) {
              let popupWrapper = all[i];
              if (popupWrapper.display === 'none'){
                continue;
              }
              if (parseInt(popupWrapper.style.zIndex) === lastZindex){
                if (popupWrapper.contains(this.elToFocus)){
                  this.elToFocus.focus();
                } else {
                  console.log(popupWrapper);
                  popupWrapper.querySelector('[autofocus]') ? popupWrapper.querySelector('[autofocus]').focus() : popupWrapper.focus();
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
    this.modalId = this._uid + '_popup';
    this.$watch('basedOn', function(newVal, oldVal){
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
  /* Popup */
  .popup-backdrop {position: fixed; top: 0; right: 0; bottom: 0; left: 0; background-color: rgba(0, 0, 0, 0.5);}
  .popup-wrapper {position: fixed; top: 0; right: 0; bottom: 0; left: 0; overflow-x: hidden; overflow-y: auto; display: none; outline: 0;}
  .popup {position: relative; margin: 0px auto; width: calc(100% - 20px); min-width: 110px; max-width:100%; color: $body-color; background-color: #fff; top:30px; cursor: default; box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5); border-radius: $border-radius;}
  .popup-titlebar {padding:10px 15px 10px 15px; color: $body-color; overflow: auto; border-bottom: 1px solid #e5e5e5;}
  .popup-title {margin-top:2px; margin-bottom: 0px; display: inline-block; font-size:18px; font-weight: normal;}
  .popup-btn-close {padding: 0px; cursor: pointer;  background: 0 0; border: 0; float: right; font-size: 17px; line-height: 17px; margin-top: 5px; margin-right: 0px; color:#ccc;}
  .popup-btn-close .fa.fa-times::before{ content: '\f156'; font: normal normal normal 17px/1 "Material Design Icons"; }
  .popup-btn-close:hover, .popup-btn-close:focus:hover{color:#6f6f6f; border-color: transparent; background-color: transparent;}
  .popup-btn-close:focus {color:#939393; border-color: transparent; background-color: transparent;}
  .popup-content {padding:10px 15px 15px 15px;}
  .popup-content .full-hr {width: auto; border: 0; border-top: 1px solid #e0e0e0; margin-top:15px; margin-bottom:15px; margin-left:-14px; margin-right:-14px;}
  .popup-fadeIn {animation-name: popup-fadeIn;} 
  @keyframes popup-fadeIn {0% {opacity: 0} 100% {opacity: 1}}
  .popup-fadeOut {animation-name: popup-fadeOut;} 
  @keyframes popup-fadeOut {0% {opacity: 1} 100% {opacity: 0}}
  .popup-fadeIn, .popup-fadeOut {animation-duration: .25s; animation-fill-mode: both;}
</style>