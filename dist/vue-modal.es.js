import { openBlock as h, createBlock as x, Teleport as w, createVNode as m, Transition as b, withCtx as v, withDirectives as p, createElementVNode as o, normalizeClass as c, normalizeStyle as f, vShow as g, renderSlot as u, toDisplayString as _, createElementBlock as k, withModifiers as I, createCommentVNode as y } from "vue";
const S = (e, s) => {
  const t = e.__vccOpts || e;
  for (const [n, l] of s)
    t[n] = l;
  return t;
}, a = {
  type: [String, Object, Array],
  default: ""
}, C = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
let d = 0;
const T = {
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
    bgClass: a,
    wrapperClass: a,
    modalClass: a,
    modalStyle: a,
    inClass: Object.assign({}, a, { default: "vm-fadeIn" }),
    outClass: Object.assign({}, a, { default: "vm-fadeOut" }),
    bgInClass: Object.assign({}, a, { default: "vm-fadeIn" }),
    bgOutClass: Object.assign({}, a, { default: "vm-fadeOut" }),
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
    this.id = "vm-" + this.$.uid, this.$watch(
      "modelValue",
      function(e) {
        e ? (this.mount = !0, this.$nextTick(() => {
          this.show = !0;
        })) : this.show = !1;
      },
      {
        immediate: !0
      }
    );
  },
  beforeUnmount() {
    this.elToFocus = null;
  },
  methods: {
    close() {
      this.enableClose === !0 && this.$emit("update:modelValue", !1);
    },
    clickOutside(e) {
      e.target === this.$refs["vm-wrapper"] && this.close();
    },
    keydown(e) {
      if ((e.which === 27 || e.keyCode === 27) && this.close(), e.which === 9 || e.keyCode === 9) {
        const s = [].slice.call(this.$refs["vm-wrapper"].querySelectorAll(C)).filter(function(t) {
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
        const t = e.querySelectorAll(C);
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
              const n = s[t];
              if (parseInt(n.style.zIndex) === e) {
                n.contains(this.elToFocus) ? this.elToFocus.focus() : this.handleFocus(n);
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
}, O = ["data-vm-backdrop-id"], z = ["data-vm-wrapper-id", "aria-label", "aria-describedby", "aria-labelledby"], E = ["data-vm-id"], A = { class: "vm-titlebar" }, F = ["id"], B = ["aria-label"], V = ["id"];
function L(e, s, t, n, l, i) {
  return l.mount ? (h(), x(w, {
    key: 0,
    to: t.appendTo
  }, [
    m(b, {
      name: "vm-backdrop-transition",
      "enter-active-class": t.bgInClass,
      "leave-active-class": t.bgOutClass
    }, {
      default: v(() => [
        p(o("div", {
          "data-vm-backdrop-id": l.id,
          class: c(["vm-backdrop", t.bgClass]),
          style: f({ "z-index": l.zIndex - 1 })
        }, null, 14, O), [
          [g, l.show]
        ])
      ]),
      _: 1
    }, 8, ["enter-active-class", "leave-active-class"]),
    m(b, {
      name: "vm-transition",
      "enter-active-class": t.inClass,
      "leave-active-class": t.outClass,
      onBeforeEnter: i.beforeOpen,
      onEnter: i.opening,
      onAfterEnter: i.afterOpen,
      onBeforeLeave: i.beforeClose,
      onLeave: i.closing,
      onAfterLeave: i.afterClose
    }, {
      default: v(() => [
        p(o("div", {
          ref: "vm-wrapper",
          "data-vm-wrapper-id": l.id,
          tabindex: "-1",
          class: c(["vm-wrapper", t.wrapperClass]),
          style: f({ "z-index": l.zIndex, cursor: t.enableClose ? "pointer" : "default" }),
          role: "dialog",
          "aria-label": t.title,
          "aria-modal": "true",
          "aria-describedby": `${l.id}-content`,
          "aria-labelledby": `${l.id}-title`,
          onClick: s[1] || (s[1] = (r) => i.clickOutside(r)),
          onKeydown: s[2] || (s[2] = (r) => i.keydown(r))
        }, [
          o("div", {
            ref: "vm",
            class: c(["vm", t.modalClass]),
            "data-vm-id": l.id,
            style: f(t.modalStyle)
          }, [
            u(e.$slots, "titlebar", {}, () => [
              o("div", A, [
                o("h3", {
                  id: `${l.id}-title`,
                  class: "vm-title"
                }, _(t.title), 9, F),
                t.enableClose ? (h(), k("button", {
                  key: 0,
                  type: "button",
                  class: "vm-btn-close",
                  "aria-label": t.closeLabel,
                  onClick: s[0] || (s[0] = I((...r) => i.close && i.close(...r), ["prevent"]))
                }, null, 8, B)) : y("", !0)
              ])
            ]),
            u(e.$slots, "content", {}, () => [
              o("div", {
                id: `${l.id}-content`,
                class: "vm-content"
              }, [
                u(e.$slots, "default")
              ], 8, V)
            ])
          ], 14, E)
        ], 46, z), [
          [g, l.show]
        ])
      ]),
      _: 3
    }, 8, ["enter-active-class", "leave-active-class", "onBeforeEnter", "onEnter", "onAfterEnter", "onBeforeLeave", "onLeave", "onAfterLeave"])
  ], 8, ["to"])) : y("", !0);
}
const j = /* @__PURE__ */ S(T, [["render", L]]);
export {
  j as default
};
