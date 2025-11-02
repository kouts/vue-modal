import { useModal } from './useModal.js'

export const modalPlugin = {
  install(app) {
    app.config.globalProperties.$modal = useModal()
  },
}
