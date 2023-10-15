<script setup>
import api from '@/services/api'
import GuestLayout from '../../layouts/GuestLayout.vue'
import { ref } from 'vue'
import { showSuccess } from '../../composables/useSweetAlert.js'
import { useRouter } from 'vue-router'

const user = ref({
  login: '',
  password: ''
})

const router = useRouter()

const loginError = ref('')

const login = async user => {
  try {
    const res = await api.post('/api/v1/login', { user })
    processSuccess(res)
  } catch (error) {
    loginError.value = error.res.data.errors
  }
}

const processSuccess = (res) => {
  localStorage.setItem('token', res.data.token)
  localStorage.setItem('user', JSON.stringify(res.data.user))

  showSuccess('Login realizado com sucesso')
  router.push('/')
}

</script>

<template>
  <GuestLayout>
    <template v-slot:title>
      <h4>Login</h4>
    </template>

    <form @submit.prevent="login(user)">
      <div class="mb-3">
        <label for="login">Login</label>
        <input type="text" v-model="user.login" class="form-control autofocus"/>
      </div>

      <div class="mb-3">
        <label for="password">Senha</label>
        <input type="password" v-model="user.password" class="form-control"/>
      </div>

      <p class="mb-3 text-danger">{{ loginError }}</p>

      <div class="mb-3">
        <button type="submit" class="btn btn-success">
          Login
        </button>
      </div>
    </form>
  </GuestLayout>
</template>
