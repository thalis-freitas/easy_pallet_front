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

const loadId = ref(route.params.load_id)
const id = ref(route.params.id)

const order = ref({
  code: '',
  bay: ''
})

onMounted(() => {
  if(id.value) {
    getOrderData(id.value, loadId.value)
  }
})

const showForm = ref(true)

const getOrderData = (id) => {
  api.get(`api/v1/orders/${id}`)
    .then(res => {
      order.value = { 
        code: res.data.code,
        bay: res.data.bay
      }
    })
    .catch(() => { showError(`Erro ao buscar lista com ID ${id}`) })
}

const isNewOrder = ref(!id.value)

const action = isNewOrder.value ? 'cadastrada' : 'atualizada'

const orderErrors = ref([])

const processSuccess = res => {
  orderErrors.value = ''
  router.push(`/loads/${loadId.value}/orders`)
  showSuccess(`Lista ${res.data.code} ${action} com sucesso`)
}

const processError = error => {
  try {
    if(error.response.status == 422) {
      orderErrors.value = error.response.data.errors
      showError(`Lista não ${action}, verifique os erros e tente novamente`)
    } else if(error.response.status == 404) {
      showForm.value = false
    }
  } catch {
    showError(`Lista não ${action}, erro inesperado`)
  }
}

const createOrder = () => {
  api.post(`api/v1/loads/${loadId.value}/orders`, order.value)
    .then(res => processSuccess(res))
    .catch(error => processError(error))
}

const updateOrder = () => {
  api.put(`api/v1/orders/${id.value}`, order.value)
    .then(res => processSuccess(res))
    .catch(error => processError(error))
}

const saveOrder = () => isNewOrder.value ? createOrder() : updateOrder()

</script>

<template>
  <BaseLayout>
    <template v-slot:title>
      <h4>{{ isNewOrder ? 'Nova Lista' : 'Editar Lista' }}</h4>
    </template>

    <form v-if="showForm" @submit.prevent="saveOrder">
      <div class="mb-3">
        <label for="code">Código</label>
        <input type="text" v-model="order.code" class="form-control" autofocus />
        <p class="text-danger">{{ orderErrors.code }}</p>
      </div>

      <div class="mb-3">
        <label for="bay">Baia</label>
        <input type="text" v-model="order.bay" class="form-control"/>
        <p class="text-danger">{{ orderErrors.bay }}</p>
      </div>

      <div class="mb-3">
        <button type="submit" class="btn btn-success">
          {{ isNewOrder ? 'Salvar' : 'Atualizar' }}
        </button>
      </div>
    </form>

    <AlertWarning v-else :message="`Nenhuma Lista encontrada com o ID ${id}`" />
  </BaseLayout>
</template>