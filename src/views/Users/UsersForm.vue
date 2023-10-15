<script setup>
import AlertWarning from '../../components/AlertWarning.vue'
import api from '@/services/api'
import BaseLayout from '../../layouts/BaseLayout.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { showSuccess, showError } from '../../composables/useSweetAlert.js'

const route = useRoute()
const router = useRouter()

const id = ref(route.params.id)

const user = ref({
  name: '',
  login: '',
  password: ''
})

onMounted(() => {
  if(id.value) {
    getUserData(id.value)
  }
})

const showForm = ref(true)

const getUserData = id => {
  api.get(`api/v1/users/${id}`)
    .then(res => {
      user.value = { 
        name: res.data.name,
        login: res.data.login,
        password: '',
      }
    })
    .catch(() => { showError(`Erro ao buscar usuário com ID ${id}`) })
}

const isNewUser = ref(!id.value)

const action = isNewUser.value ? 'cadastrado' : 'atualizado'

const userErrors = ref([])

const processSuccess = () => {
  userErrors.value = ''
  router.push('/users')
}

const processError = error => {
  try {
    if(error.response.status && error.response.status == 422) {
      userErrors.value = error.response.data.errors
      showError(`Usuário não ${action}, verifique os erros e tente novamente`)
    } else if(error.response.status == 404) {
      showForm.value = false
    } 
  } catch {
    showError(`Usuário não ${action}, erro inesperado`)
  }
}

const createUser = () => {
  api.post('api/v1/users', user.value)
    .then(res => {
      processSuccess()
      showSuccess(`Usuário ${res.data.user.login} ${action} com sucesso`)
    })
    .catch(error => processError(error))
}

const updateUser = () => {
  api.put(`api/v1/users/${id.value}`, user.value)
    .then((res) => {
      processSuccess()
      showSuccess(`Usuário ${res.data.name} ${action} com sucesso`)
    })
    .catch(error => processError(error))
}

const saveUser = () => isNewUser.value ? createUser() : updateUser()

</script>

<template>
  <BaseLayout>
    <template v-slot:title>
      <h4>{{ isNewUser ? 'Novo Usuário' : 'Editar Usuário' }}</h4>
    </template>

    <form v-if="showForm" @submit.prevent="saveUser">
      <div class="mb-3">
        <label for="name">Nome</label>
        <input type="text" v-model="user.name" class="form-control" autofocus/>
        <p class="text-danger">{{ userErrors.name }}</p>
      </div>

      <div class="mb-3">
        <label for="login">Login</label>
        <input type="text" v-model="user.login" class="form-control"/>
        <p class="text-danger">{{ userErrors.login }}</p>
      </div>

      <div class="mb-3">
        <label for="password">Senha</label>
        <input type="password" v-model="user.password" class="form-control"/>
        <p class="text-danger">{{ userErrors.password }}</p>
      </div>

      <div class="mb-3">
        <button type="submit" class="btn btn-success">
          {{ isNewUser ? 'Salvar' : 'Atualizar' }}
        </button>
      </div>
    </form>

    <AlertWarning v-else :message="`Nenhum produto encontrado com o ID ${id}`" />
  </BaseLayout>
</template>