# vue-modal <a href="https://npm.im/@kouts/vue-modal"><img src="https://badgen.net/npm/v/@kouts/vue-modal"></a> ![](https://img.badgesize.io/kouts/vue-modal/master/dist/vue-modal.umd.min.js.svg) ![](https://img.badgesize.io/kouts/vue-modal/master/dist/vue-modal.umd.min.js.svg?compression=gzip)
A customizable, stackable, and lightweight modal component for Vue.

> vue-modal is designed with web applications in mind and tries to stick as much as possible
> to the accessibility best practices set in the [WAI-ARIA Dialog (Modal)](https://www.w3.org/TR/wai-aria-practices/#dialog_modal) section
> of W3C.


## Features at a glance

- Lightweight, minified gzipped version is < **4kb**
- Opens and closes with a data variable using ```v-model```
- Includes sensible default styling but it's also highly customizable via user CSS classes and styles
- Override modal title and content via slots
- Modal intro and outro effects using CSS animation classes
- Exposes Component events - close, before-open, opening, after-open, before-close, closing, after-close
- Scrollable when it's contents exceed screen height
- Closeable by clicking on the upper right "x", the overlay or the ```esc``` key
- **Stackable** - Multiple modal windows on top of each other
- Ability to set initial focus on an element when the modal window opens, just set the **autofocus** attribute on an element inside the modal
- **Focus management** trapps keyboard focus - tabbed navigation inside the modal window
- Ability to have unclosable modal windows
- Render on demand or stay always in DOM with "live" mode
- Modals appended to ```<body>``` by default, ability to append to a custom element

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera |
| --------- | --------- | --------- | --------- | --------- |
| IE11, Edge| last 2 versions| last 2 versions| last 2 versions| last 2 versions


Click here for documentation and examples
https://vue-modal-demo.netlify.app/

# Development

In order to start development:

```sh
npm i
npm run watch
```
