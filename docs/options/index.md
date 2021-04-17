## v-model
Pass a Boolean value to the ```v-model``` directive to open and close the modal window.

## Props
<table class="table table-bordered">
  <thead>
    <tr>
      <th>Prop</th>
      <th>Description</th>
      <th>Type</th>
      <th>Default</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>title</td>
      <td>The title of the modal element</td>
      <td>String</td>
      <td><em>Empty</em></td>
    </tr>
    <tr>
      <td>baseZindex</td>
      <td>The z-index style attribute of the modal window</td>
      <td>Number</td>
      <td>1051</td>
    </tr>
    <tr>
      <td>wrapperClass</td>
      <td>Extra CSS classes for the modal wrapper</td>
      <td>String, Object, Array</td>
      <td><em>Empty</em></td>
    </tr>
    <tr>
      <td>bgClass</td>
      <td>Extra CSS classes for the modal backdrop</td>
      <td>String, Object, Array</td>
      <td><em>Empty</em></td>
    </tr>        
    <tr>
      <td>modalClass</td>
      <td>Extra CSS classes for the modal element</td>
      <td>String, Object, Array</td>
      <td><em>Empty</em></td>
    </tr>
    <tr>
      <td>modalStyle</td>
      <td>Extra CSS styles for the modal element</td>
      <td>Object</td>
      <td><em>Empty</em></td>
    </tr>
    <tr>
      <td>inClass</td>
      <td>Animation class for the modal intro</td>
      <td>String, Object, Array</td>
      <td>vm-fadeIn</td>
    </tr>
    <tr>
      <td>outClass</td>
      <td>Animation class for the modal outro</td>
      <td>String, Object, Array</td>
      <td>vm-fadeOut</td>
    </tr>
    <tr>
      <td>bgInClass</td>
      <td>Animation class for the modal backdrop intro</td>
      <td>String, Object, Array</td>
      <td>vm-fadeIn</td>
    </tr>
    <tr>
      <td>bgOutClass</td>
      <td>Animation class for the modal backdrop outro</td>
      <td>String, Object, Array</td>
      <td>vm-fadeOut</td>
    </tr>    
    <tr>
      <td>appendTo</td>
      <td>Element (selector) in which the modal is to be inserted to, e.g '#modal-host'<br /> <strong>This option should not be changed at runtime</strong></td>
      <td>String</td>
      <td>body</td>
    </tr>
    <tr>
      <td>live</td>
      <td>Controls whether the modal renders dynamically or stays hidden in the DOM<br /> <strong>This option should not be changed at runtime</strong></td>
      <td>Boolean</td>
      <td>false</td>
    </tr>
    <tr>
      <td>enableClose</td>
      <td>Controls whether the modal window is closable or not</td>
      <td>Boolean</td>
      <td>true</td>
    </tr>    
    <tr>
      <td>basedOn</td>
      <td>Opens and closes the modal window, this is used by <code>v-model</code> internally.</td>
      <td>Boolean</td>
      <td>false</td>
    </tr>    
  </tbody>
</table>

## Slots
### default
The default slot to use for the content of the modal.

### titlebar
The slot to use for overriding the titlebar of the modal

Default value:
``` vue
<div class="vm-titlebar">
  <h3 class="vm-title">
    {{ title }}
  </h3>
  <button
    v-if="enableClose"
    type="button"
    class="vm-btn-close"
    @click.prevent="close"
  ></button>
</div>
```

### content
The slot to use for overriding the content of the modal

Default value:
``` vue
<div class="vm-content">
  <slot></slot>
</div>
```

## Events
<table class="table table-bordered">
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>close</td>
      <td>Event that fires when dialog closes</td>
    </tr>
    <tr>
      <td>before-open</td>
      <td>Event that fires before the modal opening transition starts</td>
    </tr>
    <tr>
      <td>opening</td>
      <td>Event that fires while the modal opening transition is in progress</td>
    </tr>
    <tr>
      <td>after-open</td>
      <td>Event that fires when the modal opening transition is finished</td>
    </tr>
    <tr>
      <td>before-close</td>
      <td>Event that fires before the modal closing transition starts</td>
    </tr>
    <tr>
      <td>closing</td>
      <td>Event that fires while the modal closing transition is in progress</td>
    </tr>
    <tr>
      <td>after-close</td>
      <td>Event that fires when the modal closing transition is finished</td>
    </tr>    
  </tbody>
</table>