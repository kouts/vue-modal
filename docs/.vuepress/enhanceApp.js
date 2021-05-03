import Modal from '../../src/Modal.vue'
import './styles/styles.scss'

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  if (typeof process === 'undefined') {
    // process is undefined in a browser
    Vue.component('Modal', Modal)
  }
}
