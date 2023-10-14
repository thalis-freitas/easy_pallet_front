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

const load = ref({
  code: '',
  delivery_date: ''
})

onMounted(() => {
  if(id.value) {
    getLoadData(id.value)
  }
})

const getLoadData = id => {
  api.get(`api/v1/loads/${id}`).then(res => {
    load.value = { 
      code: res.data.code,
      delivery_date: res.data.delivery_date
    }
  })
}

const isNewLoad = ref(!id.value)

const action = isNewLoad.value ? 'cadastrada' : 'atualizada'

const loadErrors = ref([])

const processSuccess = res => {
  loadErrors.value = ''
  router.push('/loads')
  showSuccess(`Carga ${res.data.code} ${action} com sucesso`)
}

const processError = error => {
  if(error.response.status == 422) {
    loadErrors.value = error.response.data.errors
    showError(`Carga não ${action}, verifique os erros e tente novamente`)
  }
}

const createLoad = () => {
  api.post('api/v1/loads', load.value)
      .then(res => { processSuccess(res) })
      .catch(error => { processError(error) })
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

    <div class="mb-3">
      <label for="code">Código</label>
      <input type="text" v-model="load.code" class="form-control"/>
      <p class="text-danger">{{ loadErrors.code }}</p>
    </div>

    <div class="mb-3">
      <label for="delivery_date">Data de entrega</label>
      <input type="date" v-model="load.delivery_date" class="form-control"/>
      <p class="text-danger">{{ loadErrors.delivery_date }}</p>
    </div>

    <div class="mb-3">
      <button @click="saveLoad" type="button" class="btn btn-success">
        {{ isNewLoad ? 'Salvar' : 'Atualizar' }}
      </button>
    </div>
  </BaseLayout>
</template>