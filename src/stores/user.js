
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    username: '',
    email: '',
    id:'',
  }),
  actions: {
    setUsername(name) {
      this.username = name
    },
    setEmail(email) {
      this.email = email
    },
    setID(id) {
      this.id = id
    },
    setUserData({ username, email, id }) {
      this.username = username
      this.email = email
      this.id = id
    },
    clearUser() {
      this.username = ''
      this.email = ''
      this.id = ''
    }
  },
  persist: {
    storage: sessionStorage, // o localStorage si preferís
  },
})

