# Usage

There are two ways in which you can control `vue-modal`'s visibility:

1. With `v-model` directive
2. Using a `name` prop and `show`/`hide` functions

## Usage with `v-model` directive

To control the visibility of the modal with `v-model`, you need to pass a `Boolean` value to the `v-model` directive.

```vue
<template>
  <!-- Set the `showModal` to true to display the modal -->
  <button type="button" @click="showModal = true">Open a modal</button>

  <Modal v-model="showModal" title="My first modal">
    <p>Modal content goes here...</p>
  </Modal>
</template>

<script setup>
import { ref } from 'vue'
// You can skip the import if you've registered the component globally
import { Modal } from '@kouts/vue-modal'

const showModal = ref(false)
</script>
```

**Result:**

<Example1 />

## Usage with `name` prop and `show`/`hide` functions

`vue-modal` comes with a `modalPlugin` that you need to import and register,  
in order to be able to use `vue-modal` with a `name` prop.

```js
import { createApp } from 'vue'
import { modalPlugin } from '@kouts/vue-modal'

const app = Vue.createApp({...})

app.use(modalPlugin)
```

To control the visibility of the modal with the name `prop` you use the `show`/`hide` functions.

**Composition API**

```vue
<template>
  <!-- Use the `show` function to display the modal -->
  <button type="button" @click="show('myModal')">Open a modal</button>

  <Modal name="myModal" title="My first modal">
    <p>Modal content goes here...</p>
  </Modal>
</template>

<script setup>
// You can skip the import if you've registered the component globally
import { Modal, useModal } from '@kouts/vue-modal'

const { show } = useModal()
</script>
```

**Options API**

```vue
<template>
  <!-- Use the `$modal.show` function to display the modal -->
  <button type="button" @click="$modal.show('myModal')">Open a modal</button>

  <Modal name="myModal" title="My first modal">
    <p>Modal content goes here...</p>
  </Modal>
</template>

<script>
// You can skip the import if you've registered the component globally
import { Modal } from '@kouts/vue-modal'

export default {
  components: {
    Modal
  }
}
</script>
```

**Example:**

<Example2 />
