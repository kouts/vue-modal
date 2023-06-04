import { reactive } from 'vue'

const state = reactive({
  modals: {}
})

export const useModal = () => {
  const show = (name) => {
    state.modals[name] = true
  }

  const hide = (name) => {
    delete state.modals[name]
  }

  const hideAll = () => {
    Object.keys(state.modals).forEach((modalName) => {
      hide(modalName)
    })
  }

  return { state, show, hide, hideAll }
}
