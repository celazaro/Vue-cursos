import { defineStore } from 'pinia'



export const usePerfilStore = defineStore('perfil', {
  state: () => ({
    imagen_url: '',
    imagen_timestamp: Date.now(),  // ⚠️ nuevo campo reactivo
  }),
  actions: {
    setImagenUrl(url) {
      this.imagen_url = url
      this.imagen_timestamp = Date.now() // ⚠️ actualiza el timestamp para forzar recarga
    },
    refreshImagen() {
      this.imagen_timestamp = Date.now() // ⚠️ para forzar recarga manual
    },
    clearPerfil() {
      this.imagen_url = ''
      this.imagen_timestamp = Date.now()
    }
  },
  persist: {
    storage: sessionStorage, // o localStorage si preferís
  },
})