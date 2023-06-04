import { useModal } from './useModal'

export const modalPlugin = {
  install(app) {
    app.config.globalProperties.$modal = useModal()
  }
}
