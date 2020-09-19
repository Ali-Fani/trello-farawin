<template>
  <div>
    <form :class="$style.form" @submit.prevent="login()">
      <label class="input-group">
        <span class="input-label">نام کاربری</span>
        <input v-autofocus name="username" v-model="username" class="input" type="text">
      </label>
      <label class="input-group">
        <span class="input-label">رمز عبور</span>
        <input name="password" autocomplete="current-password" v-model="password" class="input" type="password">
      </label>
      <button>ورود</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { post } from '@/utils/http'

export default defineComponent({
  name: 'login',
  data: () => ({
    username: '',
    password: '',
  }),
  methods: {
    login() {
      post('/login', {
        username: this.username,
        pass: this.password
      })
        .then(res => {
          alert(res.ok ? 'لاگین شدی' : '!')
        })
    },
  },
})
</script>

<style module lang="scss">
.form {
  width: 90%;
  max-width: 450px;
  margin: auto;
}
</style>
