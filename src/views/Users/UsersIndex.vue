<script setup>
import api from '@/services/api'
import BaseLayout from '../../layouts/BaseLayout.vue'
import CircleLoading from '../../components/CircleLoading.vue'
import DataTable from '@/components/DataTable.vue'
import PaginationControl from '@/components/PaginationControl.vue'
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
} = usePagination('/api/v1/users', 'users')

const loading = ref(false)

const fields = { id: 'ID', name: 'Nome', login: 'Login' }

const deleteUser = (id) => {
  showConfirmation(
    `Deseja excluir o usuário com ID ${id}? Esta ação é irreversível!`,
    () => {
      api.delete(`api/v1/users/${id}`)
        .then(() => processSuccess(id))
        .catch(() => showError('Erro ao remover o usuário, tente novamente'))
    }
  )
}

const processSuccess = (id) => {
  showSuccessfullyRemoved('Usuário removido com sucesso')
  removeElement(items.value, id)
}

const fileInput = ref(null);

const processFile = () => {
  loading.value = true

  const file = fileInput.value.files[0];

  if (file) {
    const formData = new FormData();
    formData.append('file', file);

    importUsers(formData)
  } else {
    showError('Nenhum arquivo selecionado')
  }
}

const importUsers = async (formData) => {
  try {
    const response = await api.post('/api/v1/import/users', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    if (response && response.status === 201) {
      showSuccess('Usuários importados com sucesso')
      getItems(1)
    }
  } catch (error) {
    showError('Ocorreu um erro inesperado! Por favor verifique os dados da planilha e tente novamente')
  }

  loading.value = false
}

</script>

<template>
  <BaseLayout>
    <template v-slot:title>
      <h4>Usuários
        <RouterLink to="users/create" class="btn btn-success float-end">
            <span>Novo usuário</span>
        </RouterLink>
      </h4>
    </template>

    <div class="d-flex align-items-end mb-4">
      <div class="fs-6 me-2">
        <label for="formFile" class="form-label me-2">Importar usuários</label>
        <input class="form-control" type="file" id="formFile" ref="fileInput">
      </div>
      <button @click="processFile" class="btn btn-outline-success me-2">
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
          :to="`users/${data.item.id}/edit`"
          class="btn btn-primary me-md-2"
        >
          Editar
        </RouterLink>
        <button
          @click="deleteUser(data.item.id)"
          type="button"
          class="btn btn-outline-secondary me-md-2">
          Deletar
        </button>
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
