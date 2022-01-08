import { openBlock, createBlock, Teleport, createVNode, Transition, withCtx, withDirectives, createElementVNode, normalizeClass, normalizeStyle, vShow, renderSlot, toDisplayString, createElementBlock, withModifiers, createCommentVNode } from "vue";
var Modal_vue_vue_type_style_index_0_lang = "";
var _export_sfc = (sfc, props) => {
  for (const [key, val] of props) {
    sfc[key] = val;
  }
  return sfc;
};
const TYPE_CSS = {
  type: [String, Object, Array],
  default: ""
};
const FOCUSABLE_ELEMENTS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
let animatingZIndex = 0;
const _sfc_main = {
  name: "VueModal",
  props: {
    title: {
      type: String,
      default: ""
    },
    baseZindex: {
      type: Number,
      default: 1051
    },
    bgClass: TYPE_CSS,
    wrapperClass: TYPE_CSS,
    modalClass: TYPE_CSS,
    modalStyle: TYPE_CSS,
    inClass: Object.assign({}, TYPE_CSS, { default: "vm-fadeIn" }),
    outClass: Object.assign({}, TYPE_CSS, { default: "vm-fadeOut" }),
    bgInClass: Object.assign({}, TYPE_CSS, { default: "vm-fadeIn" }),
    bgOutClass: Object.assign({}, TYPE_CSS, { default: "vm-fadeOut" }),
    appendTo: {
      type: String,
      default: "body"
    },
    live: {
      type: Boolean,
      default: false
    },
    enableClose: {
      type: Boolean,
      default: true
    },
    modelValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ["before-open", "opening", "after-open", "before-close", "closing", "after-close", "update:modelValue"],
  data() {
    return {
      zIndex: 0,
      id: null,
      show: false,
      mount: false,
      elToFocus: null
    };
  },
  created() {
    if (this.live) {
      this.mount = true;
    }
  },
  mounted() {
    this.id = "vm-" + this.$.uid;
    this.$watch("modelValue", function(newVal) {
      if (newVal) {
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
  beforeUnmount() {
    this.elToFocus = null;
  },
  methods: {
    close() {
      if (this.enableClose === true) {
        this.$emit("update:modelValue", false);
      }
    },
    clickOutside(e) {
      if (e.target === this.$refs["vm-wrapper"]) {
        this.close();
      }
    },
    keydown(e) {
      if (e.which === 27) {
        this.close();
      }
      if (e.which === 9) {
        const all = [].slice.call(this.$refs["vm-wrapper"].querySelectorAll(FOCUSABLE_ELEMENTS)).filter(function(el) {
          return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
        });
        if (e.shiftKey) {
          if (e.target === all[0] || e.target === this.$refs["vm-wrapper"]) {
            e.preventDefault();
            all[all.length - 1].focus();
          }
        } else {
          if (e.target === all[all.length - 1]) {
            e.preventDefault();
            all[0].focus();
          }
        }
      }
    },
    getAllVisibleWrappers() {
      return [].slice.call(document.querySelectorAll("[data-vm-wrapper-id]")).filter((w) => w.display !== "none");
    },
    getTopZindex() {
      return this.getAllVisibleWrappers().reduce((acc, curr) => {
        return parseInt(curr.style.zIndex) > acc ? parseInt(curr.style.zIndex) : acc;
      }, 0);
    },
    handleFocus(wrapper) {
      const autofocus = wrapper.querySelector("[autofocus]");
      if (autofocus) {
        autofocus.focus();
      } else {
        const focusable = wrapper.querySelectorAll(FOCUSABLE_ELEMENTS);
        focusable.length ? focusable[0].focus() : wrapper.focus();
      }
    },
    beforeOpen() {
      this.elToFocus = document.activeElement;
      const lastZindex = this.getTopZindex();
      if (animatingZIndex) {
        this.zIndex = animatingZIndex + 2;
      } else {
        this.zIndex = lastZindex === 0 ? this.baseZindex : lastZindex + 2;
      }
      animatingZIndex = this.zIndex;
      this.$emit("before-open");
    },
    opening() {
      this.$emit("opening");
    },
    afterOpen() {
      this.handleFocus(this.$refs["vm-wrapper"]);
      this.$emit("after-open");
    },
    beforeClose() {
      this.$emit("before-close");
    },
    closing() {
      this.$emit("closing");
    },
    afterClose() {
      this.zIndex = 0;
      if (!this.live) {
        this.mount = false;
      }
      this.$nextTick(() => {
        window.requestAnimationFrame(() => {
          const lastZindex = this.getTopZindex();
          if (lastZindex > 0) {
            const all = this.getAllVisibleWrappers();
            for (let i = 0; i < all.length; i++) {
              const wrapper = all[i];
              if (parseInt(wrapper.style.zIndex) === lastZindex) {
                if (wrapper.contains(this.elToFocus)) {
                  this.elToFocus.focus();
                } else {
                  this.handleFocus(wrapper);
                }
                break;
              }
            }
          } else {
            if (document.body.contains(this.elToFocus)) {
              this.elToFocus.focus();
            }
          }
          animatingZIndex = 0;
          this.$emit("after-close");
        });
      });
    }
  }
};
const _hoisted_1 = ["data-vm-backdrop-id"];
const _hoisted_2 = ["data-vm-wrapper-id", "aria-label"];
const _hoisted_3 = ["data-vm-id"];
const _hoisted_4 = { class: "vm-titlebar" };
const _hoisted_5 = { class: "vm-title" };
const _hoisted_6 = { class: "vm-content" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return $data.mount ? (openBlock(), createBlock(Teleport, {
    key: 0,
    to: $props.appendTo
  }, [
    createVNode(Transition, {
      name: "vm-backdrop-transition",
      "enter-active-class": $props.bgInClass,
      "leave-active-class": $props.bgOutClass
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          "data-vm-backdrop-id": $data.id,
          class: normalizeClass(["vm-backdrop", $props.bgClass]),
          style: normalizeStyle({ "z-index": $data.zIndex - 1 })
        }, null, 14, _hoisted_1), [
          [vShow, $data.show]
        ])
      ]),
      _: 1
    }, 8, ["enter-active-class", "leave-active-class"]),
    createVNode(Transition, {
      name: "vm-transition",
      "enter-active-class": $props.inClass,
      "leave-active-class": $props.outClass,
      onBeforeEnter: $options.beforeOpen,
      onEnter: $options.opening,
      onAfterEnter: $options.afterOpen,
      onBeforeLeave: $options.beforeClose,
      onLeave: $options.closing,
      onAfterLeave: $options.afterClose
    }, {
      default: withCtx(() => [
        withDirectives(createElementVNode("div", {
          ref: "vm-wrapper",
          "data-vm-wrapper-id": $data.id,
          tabindex: "-1",
          class: normalizeClass(["vm-wrapper", $props.wrapperClass]),
          style: normalizeStyle({ "z-index": $data.zIndex, cursor: $props.enableClose ? "pointer" : "default" }),
          role: "dialog",
          "aria-label": $props.title,
          "aria-modal": "true",
          onClick: _cache[1] || (_cache[1] = ($event) => $options.clickOutside($event)),
          onKeydown: _cache[2] || (_cache[2] = ($event) => $options.keydown($event))
        }, [
          createElementVNode("div", {
            ref: "vm",
            class: normalizeClass(["vm", $props.modalClass]),
            "data-vm-id": $data.id,
            style: normalizeStyle($props.modalStyle)
          }, [
            renderSlot(_ctx.$slots, "titlebar", {}, () => [
              createElementVNode("div", _hoisted_4, [
                createElementVNode("h3", _hoisted_5, toDisplayString($props.title), 1),
                $props.enableClose ? (openBlock(), createElementBlock("button", {
                  key: 0,
                  type: "button",
                  class: "vm-btn-close",
                  "aria-label": "Close",
                  onClick: _cache[0] || (_cache[0] = withModifiers((...args) => $options.close && $options.close(...args), ["prevent"]))
                })) : createCommentVNode("", true)
              ])
            ]),
            renderSlot(_ctx.$slots, "content", {}, () => [
              createElementVNode("div", _hoisted_6, [
                renderSlot(_ctx.$slots, "default")
              ])
            ])
          ], 14, _hoisted_3)
        ], 46, _hoisted_2), [
          [vShow, $data.show]
        ])
      ]),
      _: 3
    }, 8, ["enter-active-class", "leave-active-class", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
  ], 8, ["to"])) : createCommentVNode("", true);
}
var Modal = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
export { Modal as default };
