<template>
  <div>
    <form @submit.prevent="login()">
      <label class="input-group">
        <span class="input-label">نام کاربری</span>
        <input v-model="username" class="input" type="text">
      </label>
      <label class="input-group">
        <span class="input-label">رمز عبور</span>
        <input v-model="password" class="input" type="password">
      </label>
      <button>ورود</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'login',
  data: () => ({
    username: '',
    password: '',
  }),
  methods: {
    login () {
      fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username: this.username, password: this.password }),
        headers: {
          'Content-Type': 'application/json'
        },
      })
        .then(res => {
          return res.json()
        })
        .then(res => {
          alert(res.ok ? 'لاگین شدی' : '!')
        })
    },
  },
})
</script>
