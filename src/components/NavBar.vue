<script setup>
import api from '@/services/api'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { showSuccess } from '@/composables/useSweetAlert.js'

const router = useRouter()

const user = ref(JSON.parse(localStorage.getItem('user')))

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')

  delete api.defaults.headers.common['Authorization']
  user.value = ''

  showSuccess('Logout realizado com sucesso')
  router.push('/login')
}

</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">Easy Pallet</RouterLink>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 mb-lg-0">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Cargas</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/products">Produtos</RouterLink>
          </li>

          <li class="nav-item">
            <RouterLink class="nav-link" to="/users">Usuários</RouterLink>
          </li>

        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link disabled">{{ user.login }}</a>
          </li>

          <li class="nav-item">
            <button class="btn btn-outline-secondary" @click="logout">
              Sair
            </button>
          </li>
        </ul>
      </div>

    </div>
  </nav>
</template>