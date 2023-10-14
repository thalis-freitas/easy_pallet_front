<script setup>
import api from '@/services/api'
import BaseLayout from '../../layouts/BaseLayout.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { showSuccess, showError } from '../../composables/useSweetAlert.js'

const router = useRouter()

const load = ref({
  code: '',
  delivery_date: ''
})

const loadErrors = ref([])

const processSuccess = res => {
  loadErrors.value = ''
  router.push('/loads')
  showSuccess(`Carga ${res.data.code} cadastrada com sucess`)
}

const processError = error => {
  if(error.response.status == 422) {
    loadErrors.value = error.response.data.errors
    showError('Carga não cadastrada, verifique os erros e tente novamente')
  }
}

const saveLoad = () => {
  api.post('api/v1/loads', load.value)
    .then(res => { processSuccess(res) })
    .catch(error => { processError(error) })
}

</script>

<template>
  <BaseLayout>
    <template v-slot:title>
      <h4>Nova Carga</h4>
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
        Salvar
      </button>
    </div>
  </BaseLayout>
</template>