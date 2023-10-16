<script setup>
import api from '@/services/api'
import BaseLayout from '../../layouts/BaseLayout.vue'
import CircleLoading from '../../components/CircleLoading.vue'
import DataTable from '@/components/DataTable.vue'
import PaginationControl from '@/components/PaginationControl.vue'
import { processFile } from '../../composables/importUtils'
import { ref } from 'vue'
import { removeElement } from '../../composables/tableUtils'

import {
  showConfirmation,
  showSuccessfullyRemoved,
  showError,
  showSuccess
} from '../../composables/useSweetAlert.js'

import { usePagination } from '../../composables/usePagination'

const {
  items,
  pagination,
  paginationLoaded,
  totalPage,
  changePage,
  getItems
} = usePagination('/api/v1/loads', 'loads')

const loading = ref(false)

const fileInput = ref(null)

const processImport = () => {
  loading.value = true
  processFile(fileInput.value.files[0], importLoads)
}

const importLoads = async (formData) => {
  try {
    await api.post('/api/v1/import/loads', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    showSuccess('Cargas importados com sucesso')
    getItems(1)
  } catch (error) {
    showError('Ocorreu um erro inesperado! ')
  }
  loading.value = false
}

const fields = { id: 'ID', code: 'Código', delivery_date: 'Data de Entrega' }

const deleteLoad = (id) => {
  showConfirmation(
    `Deseja excluir a carga com ID ${id}? Esta ação é irreversível!`,
    () => {
      api.delete(`api/v1/loads/${id}`)
        .then(() => processSuccess(id))
        .catch(() => showError('Erro ao remover a carga, tente novamente'))
    }
  )
}

const processSuccess = (id) => {
  showSuccessfullyRemoved('Carga removida com sucesso')
  removeElement(items.value, id)
}

</script>

<template>
  <BaseLayout>
    <template v-slot:title>
      <h4>Cargas
        <RouterLink to="loads/create" class="btn btn-success float-end">
            <span>Nova Carga</span>
        </RouterLink>
      </h4>
    </template>

    <div class="d-flex align-items-end mb-4">
      <div class="fs-6 me-2">
        <label for="formFile" class="form-label me-2">Importar cargas</label>
        <input class="form-control" type="file" id="formFile" ref="fileInput">
      </div>
      <button @click="processImport" class="btn btn-outline-success me-2">
        Enviar
      </button>
      <CircleLoading v-if="loading"/>
    </div>

    <DataTable
      :items="items"
      :fields="fields"
      :actions="true"
    >
      <template v-slot:actions="data">
        <RouterLink
          :to="`loads/${data.item.id}/edit`"
          class="btn btn-primary me-md-2"
        >
          Editar
        </RouterLink>
        <button
          @click="deleteLoad(data.item.id)"
          type="button"
          class="btn btn-outline-secondary me-md-2">
          Deletar
        </button>
        <RouterLink
          :to="`loads/${data.item.id}/orders`"
          class="btn btn-primary"
        >
          Listas
        </RouterLink>
      </template>
    </DataTable>

    <PaginationControl
      v-if="paginationLoaded"
      :pagination="pagination"
      :total-page="totalPage"
      @page-changed="changePage"
    />

  </BaseLayout>
</template>
