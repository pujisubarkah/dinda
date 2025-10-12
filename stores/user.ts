import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    id: null as number | null,
    name: '' as string,
    email: '' as string,
    // tambahkan field lain sesuai kebutuhan
  }),
  actions: {
    setUser(user: { id: number | null; name: string; email: string }) {
      this.id = user.id
      this.name = user.name
      this.email = user.email
    },
    clearUser() {
      this.id = null
      this.name = ''
      this.email = ''
    }
  }
})
