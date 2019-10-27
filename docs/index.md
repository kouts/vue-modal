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
- Focus management trapps keyboard focus - tabbed navigation inside the modal window
- Ability to have unclosable modal windows
- Render on demand or stay always in DOM with "live" mode
- Modals appended to ```<body>``` by default, ability to append to a custom element