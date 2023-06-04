import { openBlock as m, createBlock as x, Teleport as _, createVNode as b, Transition as v, withCtx as g, withDirectives as p, createElementVNode as n, normalizeClass as u, normalizeStyle as f, vShow as y, renderSlot as h, toDisplayString as k, createElementBlock as S, withModifiers as T, createCommentVNode as C, reactive as I } from "vue";
const O = (e, s) => {
  const t = e.__vccOpts || e;
  for (const [i, l] of s)
    t[i] = l;
  return t;
}, o = {
  type: [String, Object, Array],
  default: ""
}, w = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
let d = 0;
const A = {
  name: "VueModal",
  props: {
    name: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    baseZindex: {
      type: Number,
      default: 1051
    },
    bgClass: o,
    wrapperClass: o,
    modalClass: o,
    modalStyle: o,
    inClass: Object.assign({}, o, { default: "vm-fadeIn" }),
    outClass: Object.assign({}, o, { default: "vm-fadeOut" }),
    bgInClass: Object.assign({}, o, { default: "vm-fadeIn" }),
    bgOutClass: Object.assign({}, o, { default: "vm-fadeOut" }),
    appendTo: {
      type: String,
      default: "body"
    },
    live: {
      type: Boolean,
      default: !1
    },
    enableClose: {
      type: Boolean,
      default: !0
    },
    modelValue: {
      type: Boolean,
      default: !1
    },
    closeLabel: {
      type: String,
      default: "Close"
    }
  },
  emits: ["before-open", "opening", "after-open", "before-close", "closing", "after-close", "update:modelValue"],
  data() {
    return {
      zIndex: 0,
      id: null,
      show: !1,
      mount: !1,
      elToFocus: null
    };
  },
  created() {
    this.live && (this.mount = !0);
  },
  mounted() {
    this.id = "vm-" + this.$.uid, this.name || this.$watch(
      "modelValue",
      (e) => {
        e ? (this.mount = !0, this.$nextTick(() => {
          this.show = !0;
        })) : this.show = !1;
      },
      {
        immediate: !0
      }
    ), this.name && this.$modal && this.$watch(
      "$modal.state.modals",
      (e) => {
        e[this.name] ? (this.mount = !0, this.$nextTick(() => {
          this.show = !0;
        })) : this.show = !1;
      },
      {
        deep: !0
      }
    );
  },
  beforeUnmount() {
    this.elToFocus = null, this.name && this.$modal.hide(this.name);
  },
  methods: {
    close() {
      this.enableClose === !0 && (this.$emit("update:modelValue", !1), this.name && this.$modal.hide(this.name));
    },
    clickOutside(e) {
      e.target === this.$refs["vm-wrapper"] && this.close();
    },
    keydown(e) {
      if ((e.which === 27 || e.keyCode === 27) && this.close(), e.which === 9 || e.keyCode === 9) {
        const s = [].slice.call(this.$refs["vm-wrapper"].querySelectorAll(w)).filter(function(t) {
          return !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length);
        });
        e.shiftKey ? (e.target === s[0] || e.target === this.$refs["vm-wrapper"]) && (e.preventDefault(), s[s.length - 1].focus()) : e.target === s[s.length - 1] && (e.preventDefault(), s[0].focus());
      }
    },
    getAllVisibleWrappers() {
      return [].slice.call(document.querySelectorAll("[data-vm-wrapper-id]")).filter((e) => e.display !== "none");
    },
    getTopZindex() {
      return this.getAllVisibleWrappers().reduce((e, s) => parseInt(s.style.zIndex) > e ? parseInt(s.style.zIndex) : e, 0);
    },
    handleFocus(e) {
      const s = e.querySelector("[autofocus]");
      if (s)
        s.focus();
      else {
        const t = e.querySelectorAll(w);
        t.length ? t[0].focus() : e.focus();
      }
    },
    beforeOpen() {
      this.elToFocus = document.activeElement;
      const e = this.getTopZindex();
      d ? this.zIndex = d + 2 : this.zIndex = e === 0 ? this.baseZindex : e + 2, d = this.zIndex, this.$emit("before-open");
    },
    opening() {
      this.$emit("opening");
    },
    afterOpen() {
      this.handleFocus(this.$refs["vm-wrapper"]), this.$emit("after-open");
    },
    beforeClose() {
      this.$emit("before-close");
    },
    closing() {
      this.$emit("closing");
    },
    afterClose() {
      this.zIndex = 0, this.live || (this.mount = !1), this.$nextTick(() => {
        window.requestAnimationFrame(() => {
          const e = this.getTopZindex();
          if (e > 0) {
            const s = this.getAllVisibleWrappers();
            for (let t = 0; t < s.length; t++) {
              const i = s[t];
              if (parseInt(i.style.zIndex) === e) {
                i.contains(this.elToFocus) ? this.elToFocus.focus() : this.handleFocus(i);
                break;
              }
            }
          } else
            document.body.contains(this.elToFocus) && this.elToFocus.focus();
          d = 0, this.$emit("after-close");
        });
      });
    }
  }
}, E = ["data-vm-backdrop-id"], z = ["data-vm-wrapper-id", "aria-label", "aria-describedby", "aria-labelledby"], F = ["data-vm-id"], B = { class: "vm-titlebar" }, V = ["id"], L = ["aria-label"], Z = ["id"];
function j(e, s, t, i, l, a) {
  return l.mount ? (m(), x(_, {
    key: 0,
    to: t.appendTo
  }, [
    b(v, {
      name: "vm-backdrop-transition",
      "enter-active-class": t.bgInClass,
      "leave-active-class": t.bgOutClass
    }, {
      default: g(() => [
        p(n("div", {
          "data-vm-backdrop-id": l.id,
          class: u(["vm-backdrop", t.bgClass]),
          style: f({ "z-index": l.zIndex - 1 })
        }, null, 14, E), [
          [y, l.show]
        ])
      ]),
      _: 1
    }, 8, ["enter-active-class", "leave-active-class"]),
    b(v, {
      name: "vm-transition",
      "enter-active-class": t.inClass,
      "leave-active-class": t.outClass,
      onBeforeEnter: a.beforeOpen,
      onEnter: a.opening,
      onAfterEnter: a.afterOpen,
      onBeforeLeave: a.beforeClose,
      onLeave: a.closing,
      onAfterLeave: a.afterClose
    }, {
      default: g(() => [
        p(n("div", {
          ref: "vm-wrapper",
          "data-vm-wrapper-id": l.id,
          tabindex: "-1",
          class: u(["vm-wrapper", t.wrapperClass]),
          style: f({ "z-index": l.zIndex, cursor: t.enableClose ? "pointer" : "default" }),
          role: "dialog",
          "aria-label": t.title,
          "aria-modal": "true",
          "aria-describedby": `${l.id}-content`,
          "aria-labelledby": `${l.id}-title`,
          onClick: s[1] || (s[1] = (r) => a.clickOutside(r)),
          onKeydown: s[2] || (s[2] = (r) => a.keydown(r))
        }, [
          n("div", {
            ref: "vm",
            class: u(["vm", t.modalClass]),
            "data-vm-id": l.id,
            style: f(t.modalStyle)
          }, [
            h(e.$slots, "titlebar", {}, () => [
              n("div", B, [
                n("h3", {
                  id: `${l.id}-title`,
                  class: "vm-title"
                }, k(t.title), 9, V),
                t.enableClose ? (m(), S("button", {
                  key: 0,
                  type: "button",
                  class: "vm-btn-close",
                  "aria-label": t.closeLabel,
                  onClick: s[0] || (s[0] = T((...r) => a.close && a.close(...r), ["prevent"]))
                }, null, 8, L)) : C("", !0)
              ])
            ]),
            h(e.$slots, "content", {}, () => [
              n("div", {
                id: `${l.id}-content`,
                class: "vm-content"
              }, [
                h(e.$slots, "default")
              ], 8, Z)
            ])
          ], 14, F)
        ], 46, z), [
          [y, l.show]
        ])
      ]),
      _: 3
    }, 8, ["enter-active-class", "leave-active-class", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
  ], 8, ["to"])) : C("", !0);
}
const N = /* @__PURE__ */ O(A, [["render", j]]), c = I({
  modals: {}
}), M = () => {
  const e = (i) => {
    c.modals[i] = !0;
  }, s = (i) => {
    delete c.modals[i];
  };
  return { state: c, show: e, hide: s, hideAll: () => {
    Object.keys(c.modals).forEach((i) => {
      s(i);
    });
  } };
}, D = {
  install(e) {
    e.config.globalProperties.$modal = M();
  }
};
export {
  N as Modal,
  D as modalPlugin,
  M as useModal
};
