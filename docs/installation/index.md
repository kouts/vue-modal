## Basic

Download the repo, extract ```vue-modal.umd.min.js``` and ```vue-modal.css``` out of the the ```dist``` folder
and insert them in your page.

``` html
<script type="text/javascript" src="vue-modal.umd.min.js"></script>
```

``` html
<link rel="stylesheet" href="vue-modal.css">
```

## Module System

Install it via npm
```
npm i @kouts/vue-modal --save
```
import to use it
``` js
import VueModal from '@kouts/vue-modal';
import '@kouts/vue-modal/dist/vue-modal.css';
```

## Register
Register ```vue-modal``` in your application globbaly
``` js
Vue.component('Modal', VueModal);
```
or locally
``` js
new Vue({
  el: '#app',
  components: {
    'Modal': VueModal
  }
})
```