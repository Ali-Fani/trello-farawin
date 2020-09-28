<template>
  <div class="login">
    <img src="@/assets/logo.png" alt="" class="logo">
    <h1 class="title">به بورد فراوین خوش اومدی!</h1>
    <form v-if="mode === 'login'" class="form" @submit.prevent="login()">
      <label class="input-group">
        <input placeholder="نام کاربری" v-autofocus name="username" v-model="username" class="input" type="text">
      </label>
      <label class="input-group">
        <input placeholder="رمز عبور" name="password" autocomplete="current-password" v-model="password" class="input" type="password">
      </label>
      <button class="submit">ورود</button>
      <button type="button" class="submit secondary-button" @click="$router.push('/register')">ثبت نام</button>
    </form>
    <form v-else class="form" @submit.prevent="register()">
      <label class="input-group">
        <input placeholder="نام کاربری" v-autofocus name="username" v-model="username" class="input" type="text">
      </label>
      <label class="input-group">
        <input placeholder="رمز عبور" name="password" autocomplete="new-password" v-model="password" class="input" type="password">
      </label>
      <label class="input-group">
        <input placeholder="ایمیل" name="email" autocomplete="email" v-model="email" class="input" type="email">
      </label>
      <button class="submit">ثبت نام</button>
      <button type="button" class="submit secondary-button" @click="$router.push('/login')">ورود</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { post } from '@/utils/http'

export default defineComponent({
  name: 'login',
  data() {
    return {
      username: '',
      password: '',
      email: '',
      mode: '' as 'login' | 'register',
    }
  },
  watch: {
    $route: {
      immediate: true,
      handler(route) {
        this.mode = route.name === 'Login' ? 'login' : 'register'
      },
    },
  },
  methods: {
    login() {
      post('/login', {
        username: this.username,
        pass: this.password
      })
        .then(res => {
          if (res.success) {
            localStorage.setItem('token', 'true')
            this.$router.push('/')
          } else {
            alert('لاگین نشدی!')
          }
        })
    },
    register() {
      post('/register', {
        username: this.username,
        pass: this.password,
        email: this.email,
      })
        .then(res => {
          if (res.success) {
            this.login()
          } else {
            alert('ثبت نام نشدی!')
          }
        })
    },
  },
})
</script>

<style scoped lang="scss">
.login {
  color: #e8f5fd;
}

.logo {
  width: 100px;
  display: block;
  margin: 3rem auto 0;
}

.title {
  font-size: 19px;
  text-align: center;
  margin: 2rem 0 2.5rem;
}

.form {
  width: 90%;
  max-width: 450px;
  margin: auto;
}

.input-group {
  display: block;
  margin: 1em 0;
}

.input {
  width: 100%;
  padding: .6rem .9rem;
  border-radius: 3px;
  border: 0;
  outline: 0;
  background: white;
  transition: background-color .3s;
  &:focus {
    background: #e0f4ff;
  }
}

.submit {
  border-radius: 3px;
  border: 0;
  display: block;
  width: 100%;
  padding: .6rem .9rem;
  text-align: center;
  background: #0079bf;
  border: 2px solid #0079bf;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin: 1rem 0;
  &:hover {
    background: lighten($color: #0079bf, $amount: 4);
  }
}

.secondary-button {
  background: transparent;
  color: inherit;
}
</style>
