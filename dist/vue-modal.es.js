import { createBlock as x, createCommentVNode as h, openBlock as b, Teleport as k, createVNode as v, Transition as g, withCtx as p, withDirectives as y, createElementVNode as n, normalizeStyle as u, normalizeClass as f, vShow as C, renderSlot as m, createElementBlock as S, toDisplayString as T, withModifiers as _, reactive as I } from "vue";
const O = (e, t) => {
  const s = e.__vccOpts || e;
  for (const [i, l] of t)
    s[i] = l;
  return s;
}, o = {
  type: [String, Object, Array],
  default: ""
}, w = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
let r = 0;
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
  emits: ["before-open", "opening", "opened", "before-close", "closing", "closed", "update:modelValue"],
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
    this.id = "vm-" + this.$.uid;
    const e = this.name ? `$modal.state.modals.${this.name}` : "modelValue";
    this.$watch(
      e,
      (t) => {
        t ? (this.mount = !0, this.$nextTick(() => {
          this.show = !0;
        })) : this.show = !1;
      },
      {
        immediate: !0
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
        const t = [].slice.call(this.$refs["vm-wrapper"].querySelectorAll(w)).filter(function(s) {
          return !!(s.offsetWidth || s.offsetHeight || s.getClientRects().length);
        });
        e.shiftKey ? (e.target === t[0] || e.target === this.$refs["vm-wrapper"]) && (e.preventDefault(), t[t.length - 1].focus()) : e.target === t[t.length - 1] && (e.preventDefault(), t[0].focus());
      }
    },
    getAllVisibleWrappers() {
      return [].slice.call(document.querySelectorAll("[data-vm-wrapper-id]")).filter((e) => e.display !== "none");
    },
    getTopZindex() {
      return this.getAllVisibleWrappers().reduce((e, t) => parseInt(t.style.zIndex) > e ? parseInt(t.style.zIndex) : e, 0);
    },
    handleFocus(e) {
      const t = e.querySelector("[autofocus]");
      if (t)
        t.focus();
      else {
        const s = e.querySelectorAll(w);
        s.length ? s[0].focus() : e.focus();
      }
    },
    beforeOpen() {
      this.elToFocus = document.activeElement;
      const e = this.getTopZindex();
      r ? this.zIndex = r + 2 : this.zIndex = e === 0 ? this.baseZindex : e + 2, r = this.zIndex, this.$emit("before-open");
    },
    opening() {
      this.$emit("opening");
    },
    opened() {
      this.handleFocus(this.$refs["vm-wrapper"]), this.$emit("opened");
    },
    beforeClose() {
      this.$emit("before-close");
    },
    closing() {
      this.$emit("closing");
    },
    closed() {
      this.zIndex = 0, this.live || (this.mount = !1), this.$nextTick(() => {
        window.requestAnimationFrame(() => {
          const e = this.getTopZindex();
          if (e > 0) {
            const t = this.getAllVisibleWrappers();
            for (let s = 0; s < t.length; s++) {
              const i = t[s];
              if (parseInt(i.style.zIndex) === e) {
                i.contains(this.elToFocus) ? this.elToFocus.focus() : this.handleFocus(i);
                break;
              }
            }
          } else
            document.body.contains(this.elToFocus) && this.elToFocus.focus();
          r = 0, this.$emit("closed");
        });
      });
    }
  }
}, E = ["data-vm-backdrop-id"], z = ["data-vm-wrapper-id", "aria-label", "aria-describedby", "aria-labelledby"], F = ["data-vm-id"], B = { class: "vm-titlebar" }, V = ["id"], L = ["aria-label"], Z = ["id"];
function j(e, t, s, i, l, a) {
  return l.mount ? (b(), x(k, {
    key: 0,
    to: s.appendTo
  }, [
    v(g, {
      name: "vm-backdrop-transition",
      "enter-active-class": s.bgInClass,
      "leave-active-class": s.bgOutClass
    }, {
      default: p(() => [
        y(n("div", {
          "data-vm-backdrop-id": l.id,
          class: f(["vm-backdrop", s.bgClass]),
          style: u({ "z-index": l.zIndex - 1 })
        }, null, 14, E), [
          [C, l.show]
        ])
      ]),
      _: 1
    }, 8, ["enter-active-class", "leave-active-class"]),
    v(g, {
      name: "vm-transition",
      "enter-active-class": s.inClass,
      "leave-active-class": s.outClass,
      onBeforeEnter: a.beforeOpen,
      onEnter: a.opening,
      onAfterEnter: a.opened,
      onBeforeLeave: a.beforeClose,
      onLeave: a.closing,
      onAfterLeave: a.closed
    }, {
      default: p(() => [
        y(n("div", {
          ref: "vm-wrapper",
          "data-vm-wrapper-id": l.id,
          tabindex: "-1",
          class: f(["vm-wrapper", s.wrapperClass]),
          style: u({ "z-index": l.zIndex, cursor: s.enableClose ? "pointer" : "default" }),
          role: "dialog",
          "aria-label": s.title,
          "aria-modal": "true",
          "aria-describedby": `${l.id}-content`,
          "aria-labelledby": `${l.id}-title`,
          onClick: t[1] || (t[1] = (d) => a.clickOutside(d)),
          onKeydown: t[2] || (t[2] = (d) => a.keydown(d))
        }, [
          n("div", {
            ref: "vm",
            class: f(["vm", s.modalClass]),
            "data-vm-id": l.id,
            style: u(s.modalStyle)
          }, [
            m(e.$slots, "titlebar", {}, () => [
              n("div", B, [
                n("h3", {
                  id: `${l.id}-title`,
                  class: "vm-title"
                }, T(s.title), 9, V),
                s.enableClose ? (b(), S("button", {
                  key: 0,
                  type: "button",
                  class: "vm-btn-close",
                  "aria-label": s.closeLabel,
                  onClick: t[0] || (t[0] = _((...d) => a.close && a.close(...d), ["prevent"]))
                }, null, 8, L)) : h("", !0)
              ])
            ]),
            m(e.$slots, "content", {}, () => [
              n("div", {
                id: `${l.id}-content`,
                class: "vm-content"
              }, [
                m(e.$slots, "default")
              ], 8, Z)
            ])
          ], 14, F)
        ], 46, z), [
          [C, l.show]
        ])
      ]),
      _: 3
    }, 8, ["enter-active-class", "leave-active-class", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
  ], 8, ["to"])) : h("", !0);
}
const N = /* @__PURE__ */ O(A, [["render", j]]), c = I({
  modals: {}
}), q = () => {
  const e = (i) => {
    c.modals[i] = !0;
  }, t = (i) => {
    delete c.modals[i];
  };
  return { state: c, show: e, hide: t, hideAll: () => {
    Object.keys(c.modals).forEach((i) => {
      t(i);
    });
  } };
}, W = {
  install(e) {
    e.config.globalProperties.$modal = q();
  }
};
export {
  N as Modal,
  W as modalPlugin,
  q as useModal
};
