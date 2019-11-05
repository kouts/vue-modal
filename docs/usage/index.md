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
## Use
### Template

``` vue
<button type="button" class="btn btn-primary" @click="show_modal_1=true">
  Open a modal
</button>
<Modal v-model="show_modal_1" title="My first modal" cssClass="mw10">
  <p>Modal content goes here...</p>
</Modal>
```

### Script
``` js
new Vue({
  ...
  data: {
    show_modal_1: false
  }
  ...
});
```
### Result
<Example1 />