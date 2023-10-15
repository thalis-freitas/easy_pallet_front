<script setup>
import api from '@/services/api'
import BaseLayout from '../../layouts/BaseLayout.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { showSuccess, showError } from '../../composables/useSweetAlert.js'

const route = useRoute()
const router = useRouter()

const id = ref(route.params.id)

const product = ref({
  name: '',
  ballast: ''
})

onMounted(() => {
  if(id.value) {
    getProductData(id.value)
  }
})

const showForm = ref(true)

const getProductData = id => {
  api.get(`api/v1/products/${id}`)
    .then(res => {
      product.value = { 
        name: res.data.name,
        ballast: res.data.ballast
      }
    })
    .catch(() => { showError(`Erro ao buscar produto com ID ${id}`) })
}

const isNewProduct = ref(!id.value)

const action = isNewProduct.value ? 'cadastrado' : 'atualizado'

const productErrors = ref([])

const processSuccess = res => {
  productErrors.value = ''
  router.push('/products')
  showSuccess(`Produto ${res.data.name} ${action} com sucesso`)
}

const processError = error => {
  try {
    if(error.response.status && error.response.status == 422) {
      productErrors.value = error.response.data.errors
      showError(`Produto não ${action}, verifique os erros e tente novamente`)
    } else if(error.response.status == 404) {
      showForm.value = false
    } 
  } catch {
    showError(`Produto não ${action}, erro inesperado`)
  }
}

const createProduct = () => {
  api.post('api/v1/products', product.value)
    .then(res => processSuccess(res))
    .catch(error => processError(error))
}

const updateProduct = () => {
  api.put(`api/v1/products/${id.value}`, product.value)
    .then(res => processSuccess(res))
    .catch(error => processError(error))
}

const saveProduct = () => isNewProduct.value ? createProduct() : updateProduct()

</script>

<template>
  <BaseLayout>
    <template v-slot:title>
      <h4>{{ isNewProduct ? 'Novo Produto' : 'Editar Produto' }}</h4>
    </template>

    <form v-if="showForm" @submit.prevent="saveProduct">
      <div class="mb-3">
        <label for="name">Nome</label>
        <input type="text" v-model="product.name" class="form-control" autofocus/>
        <p class="text-danger">{{ productErrors.name }}</p>
      </div>

      <div class="mb-3">
        <label for="ballast">Lastro</label>
        <input type="text" v-model="product.ballast" class="form-control"/>
        <p class="text-danger">{{ productErrors.ballast }}</p>
      </div>

      <div class="mb-3">
        <button type="submit" class="btn btn-success">
          {{ isNewProduct ? 'Salvar' : 'Atualizar' }}
        </button>
      </div>
    </form>

    <div v-else class="alert alert-danger text-center">
      Nenhum produto encontrado com o ID {{ id }}
    </div>
  </BaseLayout>
</template>