## Register
Register ```vue-modal``` in your application globbaly
``` js
const app = Vue.createApp({...})

app.component('Modal', VueModal)
```
or locally
``` js
export default {
  components: {
    'Modal': VueModal
  }
}
```
## Use
### Template
with `v-model`
``` vue
<button type="button" class="btn btn-primary" @click="showModal=true">
  Open a modal
</button>

<Modal v-model="showModal" title="My first modal">
  <p>Modal content goes here...</p>
</Modal>
```
or
with `modelValue` value and `update:modelValue` event
``` vue
<Modal :model-value="showModal" title="My first modal" @update:modelValue="showModal = false">
  <p>Modal content goes here...</p>
</Modal>
```


### Script
``` js
import VueModal from '@kouts/vue-modal'

export default {
  components: {
    'Modal': VueModal
  },  
  data() {
    return {
      showModal: false
    }
  }
}
```
### Result
<Example1 />