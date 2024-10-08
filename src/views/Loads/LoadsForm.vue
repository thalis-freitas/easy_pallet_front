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

const load = ref({
  code: '',
  delivery_date: ''
})

onMounted(() => {
  if(id.value) {
    getLoadData(id.value)
  }
})

const showForm = ref(true)

const getLoadData = id => {
  api.get(`api/v1/loads/${id}`)
    .then(res => {
      load.value = { 
        code: res.data.code,
        delivery_date: res.data.delivery_date
      }
    })
    .catch(() => { showError(`Erro ao buscar carga com ID ${id}`) })
}

const isNewLoad = ref(!id.value)

const action = isNewLoad.value ? 'cadastrada' : 'atualizada'

const loadErrors = ref([])

const processSuccess = res => {
  loadErrors.value = ''
  router.push('/')
  showSuccess(`Carga ${res.data.code} ${action} com sucesso`)
}

const processError = error => {
  try {
    if(error.response.status && error.response.status == 422) {
      loadErrors.value = error.response.data.errors
      showError(`Carga não ${action}, verifique os erros e tente novamente`)
    } else if(error.response.status == 404) {
      showForm.value = false
    } 
  } catch {
    showError(`Carga não ${action}, erro inesperado`)
  }
}

const createLoad = () => {
  api.post('api/v1/loads', load.value)
    .then(res => processSuccess(res))
    .catch(error => processError(error))
}

const updateLoad = () => {
  api.put(`api/v1/loads/${id.value}`, load.value)
    .then(res => processSuccess(res))
    .catch(error => processError(error))
}

const saveLoad = () => isNewLoad.value ? createLoad() : updateLoad()

</script>

<template>
  <BaseLayout>
    <template v-slot:title>
      <h4>{{ isNewLoad ? 'Nova Carga' : 'Editar Carga' }}</h4>
    </template>

    <form v-if="showForm" @submit.prevent="saveLoad">
      <div class="mb-3">
        <label for="code">Código</label>
        <input type="text" v-model="load.code" class="form-control" autofocus/>
        <p class="text-danger">{{ loadErrors.code }}</p>
      </div>

      <div class="mb-3">
        <label for="delivery_date">Data de entrega</label>
        <input type="date" v-model="load.delivery_date" class="form-control"/>
        <p class="text-danger">{{ loadErrors.delivery_date }}</p>
      </div>

      <div class="mb-3">
        <button type="submit" class="btn btn-success">
          {{ isNewLoad ? 'Salvar' : 'Atualizar' }}
        </button>
      </div>
    </form>

    <AlertWarning v-else :message="`Nenhuma carga encontrada com o ID ${id}`" />
  </BaseLayout>
</template>