import Vue from 'vue';

// This alphabet uses a-z A-Z 0-9 _- symbols.
// Symbols are generated for smaller size.
// -_zyxwvutsrqponmlkjihgfedcba9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA
var url = '-_';
// Loop from 36 to 0 (from z to a and 9 to 0 in Base36).
var i = 36;
while (i--) {
  // 36 is radix. Number.prototype.toString(36) returns number
  // in Base36 representation. Base36 is like hex, but it uses 0–9 and a-z.
  url += i.toString(36);
}
// Loop from 36 to 10 (from Z to A in Base36).
i = 36;
while (i-- - 10) {
  url += i.toString(36).toUpperCase();
}

/**
 * Generate URL-friendly unique ID. This method use non-secure predictable
 * random generator with bigger collision probability.
 *
 * @param {number} [size=21] The number of symbols in ID.
 *
 * @return {string} Random string.
 *
 * @example
 * const nanoid = require('nanoid/non-secure')
 * model.id = nanoid() //=> "Uakgb_J5m9g-0JDMbcJqL"
 *
 * @name nonSecure
 * @function
 */
var nonSecure = function (size) {
  var id = '';
  i = size || 21;
  // Compact alternative for `for (var i = 0; i < size; i++)`
  while (i--) {
    // `| 0` is compact and faster alternative for `Math.floor()`
    id += url[Math.random() * 64 | 0];
  }
  return id
};

var id = nonSecure;

function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var config = {
  selector: "vue-portal-target-".concat(id())
};
var setSelector = function setSelector(selector) {
  return config.selector = selector;
};
var isBrowser = typeof window !== 'undefined' && (typeof document === "undefined" ? "undefined" : _typeof(document)) !== undefined;

var TargetContainer = Vue.extend({
  // as an abstract component, it doesn't appear in
  // the $parent chain of components.
  // which means the next parent of any component rendered inside of this oen
  // will be the parent from which is was portal'd
  abstract: true,
  name: 'PortalOutlet',
  props: ['nodes', 'tag'],
  data: function data(vm) {
    return {
      updatedNodes: vm.nodes
    };
  },
  render: function render(h) {
    var nodes = this.updatedNodes && this.updatedNodes();
    if (!nodes) { return h(); }
    return nodes.length < 2 && !nodes[0].text ? nodes : h(this.tag || 'DIV', nodes);
  },
  destroyed: function destroyed() {
    var el = this.$el;
    el.parentNode.removeChild(el);
  }
});

var Portal = Vue.extend({
  name: 'VueSimplePortal',
  props: {
    disabled: {
      type: Boolean
    },
    prepend: {
      type: Boolean
    },
    selector: {
      type: String,
      default: function _default() {
        return "#".concat(config.selector);
      }
    },
    tag: {
      type: String,
      default: 'DIV'
    }
  },
  render: function render(h) {
    if (this.disabled) {
      var nodes = this.$scopedSlots && this.$scopedSlots.default();
      if (!nodes) { return h(); }
      return nodes.length < 2 && !nodes[0].text ? nodes : h(this.tag, nodes);
    }

    return h();
  },
  created: function created() {
    if (!this.getTargetEl()) {
      this.insertTargetEl();
    }
  },
  updated: function updated() {
    var _this = this;

    // We only update the target container component
    // if the scoped slot function is a fresh one
    // The new slot syntax (since Vue 2.6) can cache unchanged slot functions
    // and we want to respect that here.
    this.$nextTick(function () {
      if (!_this.disabled && _this.slotFn !== _this.$scopedSlots.default) {
        _this.container.updatedNodes = _this.$scopedSlots.default;
      }

      _this.slotFn = _this.$scopedSlots.default;
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.unmount();
  },
  watch: {
    disabled: {
      immediate: true,
      handler: function handler(disabled) {
        disabled ? this.unmount() : this.$nextTick(this.mount);
      }
    }
  },
  methods: {
    // This returns the element into which the content should be mounted.
    getTargetEl: function getTargetEl() {
      if (!isBrowser) { return; }
      return document.querySelector(this.selector);
    },
    insertTargetEl: function insertTargetEl() {
      if (!isBrowser) { return; }
      var parent = document.querySelector('body');
      var child = document.createElement(this.tag);
      child.id = this.selector.substring(1);
      parent.appendChild(child);
    },
    mount: function mount() {
      var targetEl = this.getTargetEl();
      var el = document.createElement('DIV');

      if (this.prepend && targetEl.firstChild) {
        targetEl.insertBefore(el, targetEl.firstChild);
      } else {
        targetEl.appendChild(el);
      }

      this.container = new TargetContainer({
        el: el,
        parent: this,
        propsData: {
          tag: this.tag,
          nodes: this.$scopedSlots.default
        }
      });
    },
    unmount: function unmount() {
      if (this.container) {
        this.container.$destroy();
        delete this.container;
      }
    }
  }
});

function install(_Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  _Vue.component(options.name || 'portal', Portal);

  if (options.defaultSelector) {
    setSelector(options.defaultSelector);
  }
}

if (typeof window !== 'undefined' && window.Vue && window.Vue === Vue) {
  // plugin was inlcuded directly in a browser
  Vue.use(install);
}

//

var TYPE_CSS = {
  type: [String, Object, Array],
  default: ''
};
var FOCUSABLE_ELEMENTS =
  'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
var animatingZIndex = 0;

var script = {
  name: 'VueModal',
  components: {
    Portal: Portal
  },
  model: {
    prop: 'basedOn',
    event: 'close'
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    baseZindex: {
      type: Number,
      default: 1051
    },
    bgClass: TYPE_CSS,
    wrapperClass: TYPE_CSS,
    modalClass: TYPE_CSS,
    modalStyle: TYPE_CSS,
    inClass: Object.assign({}, TYPE_CSS, { default: 'vm-fadeIn' }),
    outClass: Object.assign({}, TYPE_CSS, { default: 'vm-fadeOut' }),
    bgInClass: Object.assign({}, TYPE_CSS, { default: 'vm-fadeIn' }),
    bgOutClass: Object.assign({}, TYPE_CSS, { default: 'vm-fadeOut' }),
    appendTo: {
      type: String,
      default: 'body'
    },
    live: {
      type: Boolean,
      default: false
    },
    enableClose: {
      type: Boolean,
      default: true
    },
    basedOn: {
      type: Boolean,
      default: false
    },
    closeLabel: {
      type: String,
      default: 'Close'
    }
  },
  data: function data() {
    return {
      zIndex: 0,
      id: null,
      show: false,
      mount: false,
      elToFocus: null
    }
  },
  created: function created() {
    if (this.live) {
      this.mount = true;
    }
  },
  mounted: function mounted() {
    this.id = 'vm-' + this._uid;
    this.$watch(
      'basedOn',
      function (newVal) {
        var this$1$1 = this;

        if (newVal) {
          this.mount = true;
          this.$nextTick(function () {
            this$1$1.show = true;
          });
        } else {
          this.show = false;
        }
      },
      {
        immediate: true
      }
    );
  },
  beforeDestroy: function beforeDestroy() {
    this.elToFocus = null;
  },
  methods: {
    close: function close() {
      if (this.enableClose === true) {
        this.$emit('close', false);
      }
    },
    clickOutside: function clickOutside(e) {
      if (e.target === this.$refs['vm-wrapper']) {
        this.close();
      }
    },
    keydown: function keydown(e) {
      if (e.which === 27 || e.keyCode === 27) {
        this.close();
      }
      if (e.which === 9 || e.keyCode === 9) {
        // Get only visible elements
        var all = [].slice.call(this.$refs['vm-wrapper'].querySelectorAll(FOCUSABLE_ELEMENTS)).filter(function (el) {
          return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
        });

        if (e.shiftKey) {
          if (e.target === all[0] || e.target === this.$refs['vm-wrapper']) {
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
    getAllVisibleWrappers: function getAllVisibleWrappers() {
      return [].slice.call(document.querySelectorAll('[data-vm-wrapper-id]')).filter(function (w) { return w.display !== 'none'; })
    },
    getTopZindex: function getTopZindex() {
      return this.getAllVisibleWrappers().reduce(function (acc, curr) {
        return parseInt(curr.style.zIndex) > acc ? parseInt(curr.style.zIndex) : acc
      }, 0)
    },
    handleFocus: function handleFocus(wrapper) {
      var autofocus = wrapper.querySelector('[autofocus]');

      if (autofocus) {
        autofocus.focus();
      } else {
        var focusable = wrapper.querySelectorAll(FOCUSABLE_ELEMENTS);

        focusable.length ? focusable[0].focus() : wrapper.focus();
      }
    },
    beforeOpen: function beforeOpen() {
      // console.log('beforeOpen');
      this.elToFocus = document.activeElement;
      var lastZindex = this.getTopZindex();

      if (animatingZIndex) {
        this.zIndex = animatingZIndex + 2;
      } else {
        this.zIndex = lastZindex === 0 ? this.baseZindex : lastZindex + 2;
      }
      animatingZIndex = this.zIndex;
      this.$emit('before-open');
    },
    opening: function opening() {
      // console.log('opening');
      this.$emit('opening');
    },
    afterOpen: function afterOpen() {
      // console.log('afterOpen');
      this.handleFocus(this.$refs['vm-wrapper']);
      this.$emit('after-open');
    },
    beforeClose: function beforeClose() {
      // console.log('beforeClose');
      this.$emit('before-close');
    },
    closing: function closing() {
      // console.log('closing');
      this.$emit('closing');
    },
    afterClose: function afterClose() {
      var this$1$1 = this;

      // console.log('afterClose');
      this.zIndex = 0;
      if (!this.live) {
        this.mount = false;
      }
      this.$nextTick(function () {
        window.requestAnimationFrame(function () {
          var lastZindex = this$1$1.getTopZindex();

          if (lastZindex > 0) {
            var all = this$1$1.getAllVisibleWrappers();

            for (var i = 0; i < all.length; i++) {
              var wrapper = all[i];

              if (parseInt(wrapper.style.zIndex) === lastZindex) {
                if (wrapper.contains(this$1$1.elToFocus)) {
                  this$1$1.elToFocus.focus();
                } else {
                  // console.log(wrapper);
                  this$1$1.handleFocus(wrapper);
                }
                break
              }
            }
          } else {
            if (document.body.contains(this$1$1.elToFocus)) {
              this$1$1.elToFocus.focus();
            }
          }
          animatingZIndex = 0;
          this$1$1.$emit('after-close');
        });
      });
    }
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    var options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    var hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            var originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            var existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
var __vue_script__ = script;
/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.mount
    ? _c(
        "portal",
        { attrs: { selector: _vm.appendTo } },
        [
          _c(
            "transition",
            {
              attrs: {
                name: "vm-backdrop-transition",
                "enter-active-class": _vm.bgInClass,
                "leave-active-class": _vm.bgOutClass,
              },
            },
            [
              _c("div", {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.show,
                    expression: "show",
                  } ],
                staticClass: "vm-backdrop",
                class: _vm.bgClass,
                style: { "z-index": _vm.zIndex - 1 },
                attrs: { "data-vm-backdrop-id": _vm.id },
              }) ]
          ),
          _vm._v(" "),
          _c(
            "transition",
            {
              attrs: {
                name: "vm-transition",
                "enter-active-class": _vm.inClass,
                "leave-active-class": _vm.outClass,
              },
              on: {
                "before-enter": _vm.beforeOpen,
                enter: _vm.opening,
                "after-enter": _vm.afterOpen,
                "before-leave": _vm.beforeClose,
                leave: _vm.closing,
                "after-leave": _vm.afterClose,
              },
            },
            [
              _c(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: _vm.show,
                      expression: "show",
                    } ],
                  ref: "vm-wrapper",
                  staticClass: "vm-wrapper",
                  class: _vm.wrapperClass,
                  style: {
                    "z-index": _vm.zIndex,
                    cursor: _vm.enableClose ? "pointer" : "default",
                  },
                  attrs: {
                    "data-vm-wrapper-id": _vm.id,
                    tabindex: "-1",
                    role: "dialog",
                    "aria-label": _vm.title,
                    "aria-modal": "true",
                    "aria-describedby": _vm.id + "-content",
                    "aria-labelledby": _vm.id + "-title",
                  },
                  on: {
                    click: function ($event) {
                      return _vm.clickOutside($event)
                    },
                    keydown: function ($event) {
                      return _vm.keydown($event)
                    },
                  },
                },
                [
                  _c(
                    "div",
                    {
                      ref: "vm",
                      staticClass: "vm",
                      class: _vm.modalClass,
                      style: _vm.modalStyle,
                      attrs: { "data-vm-id": _vm.id },
                    },
                    [
                      _vm._t("titlebar", function () {
                        return [
                          _c("div", { staticClass: "vm-titlebar" }, [
                            _c(
                              "h3",
                              {
                                staticClass: "vm-title",
                                attrs: { id: _vm.id + "-title" },
                              },
                              [
                                _vm._v(
                                  "\n              " +
                                    _vm._s(_vm.title) +
                                    "\n            "
                                ) ]
                            ),
                            _vm._v(" "),
                            _vm.enableClose
                              ? _c("button", {
                                  staticClass: "vm-btn-close",
                                  attrs: {
                                    type: "button",
                                    "aria-label": _vm.closeLabel,
                                  },
                                  on: {
                                    click: function ($event) {
                                      $event.preventDefault();
                                      return _vm.close.apply(null, arguments)
                                    },
                                  },
                                })
                              : _vm._e() ]) ]
                      }),
                      _vm._v(" "),
                      _vm._t("content", function () {
                        return [
                          _c(
                            "div",
                            {
                              staticClass: "vm-content",
                              attrs: { id: _vm.id + "-content" },
                            },
                            [_vm._t("default")],
                            2
                          ) ]
                      }) ],
                    2
                  ) ]
              ) ]
          ) ],
        1
      )
    : _vm._e()
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  var __vue_inject_styles__ = undefined;
  /* scoped */
  var __vue_scope_id__ = undefined;
  /* module identifier */
  var __vue_module_identifier__ = undefined;
  /* functional template */
  var __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  var __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

export { __vue_component__ as default };
//# sourceMappingURL=vue-modal.es.js.map
