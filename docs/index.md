<style lang="css">
/* Max-widths */
.mw1 {max-width: 35px !important;} .mw2 {max-width: 90px !important;} .mw3 {max-width: 145px !important;} .mw4 {max-width: 200px !important;} .mw5 {max-width: 255px !important;} .mw6 {max-width: 310px !important;} .mw7 {max-width: 365px !important;} .mw8 {max-width: 420px !important;} .mw9 {max-width: 475px !important;} .mw10 {max-width: 530px !important;} .mw11 {max-width: 585px !important;} .mw12 {max-width: 640px !important;} .mw13 {max-width: 695px !important;} .mw14 {max-width: 750px !important;} .mw15 {max-width: 805px !important;} .mw16 {max-width: 860px !important;} .mw17 {max-width: 915px !important;} .mw18 {max-width: 970px !important;}
</style>

# vue-modal

A modal window component for Vue

This page includes basic documentation and examples for the vue-modal component.

<Intro />

## Features at a glance

- Lightweight, minified version is < 8kb
- Opens and closes with a data variable
- Includes default styling but it's also highly customizable via user CSS classes and styles
- Modal intro and outro effects using CSS animations
- Exposes Component events - beforeOpen, opening, afterOpen, beforeClose, afterClose
- Scrollable when it's contents exceed screen height
- Closeable by clicking on the upper right "x", the overlay or the esc key
- Stackable - Multiple modal windows on top of each other
- Ability to set initial focus on an element when the modal window opens, just set the autofocus attribute on an element inside the modal
- Focus management trapps keyboard focus - navigation inside the modal window
- Ability to have unclosable modal windows
- Render on demand or stay always in DOM with "live" mode
- Ability to append to an element
