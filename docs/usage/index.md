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
<button type="button" class="btn btn-primary" @click="showModal=true">
  Open a modal
</button>
<Modal v-model="showModal" title="My first modal">
  <p>Modal content goes here...</p>
</Modal>
```

### Script
``` js
new Vue({
  ...
  data: {
    showModal: false
  }
  ...
});
```
### Result
<Example1 />