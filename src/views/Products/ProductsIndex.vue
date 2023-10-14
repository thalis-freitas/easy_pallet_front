<script setup>
import api from '@/services/api'
import BaseLayout from '../../layouts/BaseLayout.vue'
import DataTable from '@/components/DataTable.vue'
import PaginationControl from '@/components/PaginationControl.vue'
import { removeElement } from '../../composables/tableUtils'
import {
  showConfirmation,
  showSuccessfullyRemoved,
  showError
} from '../../composables/useSweetAlert.js'
import { usePagination } from '../../composables/usePagination'

const {
  items,
  pagination,
  paginationLoaded,
  totalPage,
  changePage
} = usePagination('/api/v1/products', 'products')

const fields = { id: 'ID', name: 'Nome', ballast: 'Lastro' }

const deleteProduct = (id) => {
  showConfirmation(
    `Deseja excluir o produto com ID ${id}? Esta ação é irreversível!`,
    () => {
      api.delete(`api/v1/products/${id}`)
        .then(() => processSuccess(id))
        .catch(() => showError('Erro ao remover o produto, tente novamente'))
    }
  )
}

const processSuccess = (id) => {
  showSuccessfullyRemoved('Produto removida com sucesso')
  removeElement(items.value, id)
}

</script>

<template>
  <BaseLayout>
    <template v-slot:title>
      <h4>Produtos
        <RouterLink to="products/create" class="btn btn-success float-end">
            <span>Novo produto</span>
        </RouterLink>
      </h4>
    </template>

    <DataTable
      :items="items"
      :fields="fields"
      :actions="true"
    >
      <template v-slot:actions="data">
        <RouterLink
          :to="`products/${data.item.id}/edit`"
          class="btn btn-primary me-md-2"
        >
          Editar
        </RouterLink>
        <button
          @click="deleteProduct(data.item.id)"
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
