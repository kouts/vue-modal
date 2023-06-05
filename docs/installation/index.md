## Basic

Download the repo, extract `vue-modal.umd.js` and `vue-modal.css` out of the `dist` folder
and insert them in your page.

```html
<script type="text/javascript" src="vue-modal.umd.js"></script>
```

```html
<link rel="stylesheet" href="vue-modal.css" />
```

The `vue-modal` component and functions are now globally available via the `VueModal` object.

## Module System

Install it via `npm`

```
npm i @kouts/vue-modal@next --save
```

Use the `import` statement to include it into your `main.js` file.  
You may also choose to register `vue-modal` globally, so that you don't need to import it in every component.

```js
import { createApp } from 'vue'
import { Modal } from '@kouts/vue-modal'
import '@kouts/vue-modal/dist/vue-modal.css'

const app = Vue.createApp({...})

// This is optional
app.component('Modal', Modal)
```
