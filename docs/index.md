# vue-modal

![Vue modal](./assets/img/vue-modal-logo.png)

<a href="https://npm.im/@kouts/vue-modal"><img src="https://badgen.net/npm/v/@kouts/vue-modal/next"></a> ![](https://img.badgesize.io/kouts/vue-modal/next/dist/vue-modal.umd.js.svg) ![](https://img.badgesize.io/kouts/vue-modal/next/dist/vue-modal.umd.js.svg?compression=gzip) ![](../coverage/badge.svg)

A customizable, stackable, and lightweight modal component for Vue.js 3.

> vue-modal is designed with web applications in mind and tries to stick as much as possible
> to the accessibility best practices set in the [WAI-ARIA Dialog (Modal)](https://www.w3.org/TR/wai-aria-practices/#dialog_modal) section
> of W3C.

<Intro />

## Features at a glance

<p class="mb-n3">&nbsp;</p>

- Lightweight, minified gzipped version is < **4kb**
- Opens and closes with a data variable using `v-model` **or** with a `name` prop and `show`/`hide` functions
- Includes sensible default styling but it's also highly customizable via user CSS classes and styles
- Override modal title and content via slots
- Modal intro and outro effects using CSS animation classes
- Exposes Component events - `before-open`, `opening`, `opened`, `before-close`, `closing`, `closed`, `update:modelValue` (close)
- Scrollable when its contents exceed screen height
- Closeable by clicking on the upper right "x", the overlay or the `esc` key
- **Stackable** - Multiple modal windows on top of each other
- Ability to set initial focus on an element when the modal window opens, just set the **autofocus** attribute on an element inside the modal
- **Focus management** traps keyboard focus - tabbed navigation inside the modal window
- Ability to have unclosable modal windows
- Render on demand or stay always in DOM with "live" mode
- Modals appended to `<body>` by default, ability to append to a custom element

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Edge                                                                                                                                                                       | last 2 versions                                                                                                                                                                        | last 2 versions                                                                                                                                                                    | last 2 versions                                                                                                                                                                    | last 2 versions                                                                                                                                                                |

## `vue-modal` 5.0 release

The 5.0 release of `vue-modal` introduced the following **breaking changes**:

- Renamed event names `after-close` to `closed` and `after-open` to `opened`
- Added a Plugin API so that modals can be opened and closed using a `name` prop.
