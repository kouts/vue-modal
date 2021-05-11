## Modal sizes

vue-modal is responsive out-of-the box, with a default <code>max-width</code> of 500px.  
You can set its width using the <code>modal-style</code> and <code>modal-class</code> props.

<vue-example file="customizing/responsive" class="mb-4" />

## Scrollable content
<br />
Using the <code>modal-class</code> prop and some additional CSS, 
we can have a modal that allows scroll on the modal content.
<br />
<br />

<vue-example file="customizing/scrollable-content" class="mb-4" />

## Vertically centered
<br />
Using the <code>wrapper-class</code> prop and some additional CSS, 
we can have a vertically centered modal.
<br />
<br />

<vue-example file="customizing/vertically-centered" class="mb-4" />

## Fullscreen
<br />
Sometimes we want a modal that covers the entire viewport.<br /> 
We can achieve that using the <code>wrapper-class</code> and <code>modal-class</code> props. 
<br />
<br />

<ClientOnly>
  <vue-example file="customizing/fullscreen" class="mb-4" />
</ClientOnly>