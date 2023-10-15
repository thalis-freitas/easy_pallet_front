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

const orderId = ref(route.params.order_id)
const id = ref(route.params.id)

const products = ref([])

const orderProduct = ref({
  quantity: '',
  product_id: ''
})

onMounted(() => {
  if(id.value) {
    getOrderProductData(id.value, orderId.value)
  }

  getProducts()
})

const showForm = ref(true)

const getOrderProductData = (id) => {
  api.get(`api/v1/order_products/${id}`)
    .then(res => {
      orderProduct.value = { 
        quantity: res.data.quantity,
        product_id: res.data.product_id
      }
    })
    .catch(() => { showError(`Erro ao buscar produto da lista com ID ${id}`) })
}

const getProducts = () => {
  api.get('api/v1/all/products')
    .then(res => {
      products.value = res.data
    })
    .catch(() => { showError('Erro ao obter informações de produtos') })
}

const isNewOrderProduct = ref(!id.value)

const action = isNewOrderProduct.value ? 'cadastrado' : 'atualizado'

const orderProductErrors = ref([])

const processSuccess = () => {
  orderProductErrors.value = ''
  router.push(`/orders/${orderId.value}/order_products`)
  showSuccess(`Produto da lista ${action} com sucesso`)
}

const processError = error => {
  try {
    if(error.response.status == 422) {
      orderProductErrors.value = error.response.data.errors
      showError(`Produto da lista não ${action}, verifique os erros e tente novamente`)
    } else if(error.response.status == 404) {
      showForm.value = false
    }
  } catch {
    showError(`Produto da lista não ${action}, erro inesperado`)
  }
}

const createOrderProduct = () => {
  api.post(`api/v1/orders/${orderId.value}/order_products`, orderProduct.value)
    .then(res => processSuccess(res))
    .catch(error => processError(error))
}

const updateOrderProduct = () => {
  api.put(`api/v1/order_products/${id.value}`, orderProduct.value)
    .then(res => processSuccess(res))
    .catch(error => processError(error))
}

const saveOrderProduct = () => {
  isNewOrderProduct.value ? createOrderProduct() : updateOrderProduct()
}

</script>

<template>
  <BaseLayout>
    <template v-slot:title>
      <h4>
        {{ isNewOrderProduct ? 'Novo Produto da Lista' : 'Editar Produto da Lista' }}
      </h4>
    </template>

    <form v-if="showForm" @submit.prevent="saveOrderProduct">
      <div class="mb-3">
        <label for="quantity">Quantidade</label>
        <input
          type="text"
          v-model="orderProduct.quantity"
          class="form-control"
          autofocus
        />
        <p class="text-danger">{{ orderProductErrors.quantity }}</p>
      </div>

      <div class="mb-3 form-group">
          <label for="productSelect">Produto:</label>
          <select
            class="form-control"
            id="productSelect"
            v-model="orderProduct.product_id"
          >
            <option
              v-for="product in products"
              :key="product.id"
              :value="product.id"
            >
              {{ product.name }}
            </option>
          </select>
          <p class="text-danger">{{ orderProductErrors.product }}</p>
      </div>

      <div class="mb-3">
        <button type="submit" class="btn btn-success">
          {{ isNewOrderProduct ? 'Salvar' : 'Atualizar' }}
        </button>
      </div>
    </form>

    <AlertWarning
      v-else
      :message="`Nenhum Produto da Lista encontrado com o ID ${id}`"
    />
  </BaseLayout>
</template>