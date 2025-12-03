import { defineStore } from 'pinia'

export const useRoleStore = defineStore('role', {
  state: () => ({
    role: '',
  }),
  actions: {
    setRole(role) {
      this.role = role
    },
    clearRole() {
      this.role = ''
    }
  },
  persist: {
    storage: sessionStorage, // o localStorage si preferís
  },
})

