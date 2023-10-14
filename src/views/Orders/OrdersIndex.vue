<script setup>
import api from '@/services/api'
import BaseLayout from '../../layouts/BaseLayout.vue'
import DataTable from '@/components/DataTable.vue'
import PaginationControl from '@/components/PaginationControl.vue'
import { ref } from 'vue'
import { removeElement } from '../../composables/tableUtils'
import {
  showConfirmation,
  showSuccessfullyRemoved,
  showError
} from '../../composables/useSweetAlert.js'
import { usePagination } from '../../composables/usePagination'
import { useRoute } from 'vue-router'

const route = useRoute()

const loadId = ref(route.params.load_id)

const {
  items,
  pagination,
  paginationLoaded,
  totalPage,
  changePage
} = usePagination(`/api/v1/loads/${loadId.value}/orders`, 'orders')

const fields = { id: 'ID', code: 'Código', bay: 'Baia'}

const deleteOrder = (id) => {
  showConfirmation(
    `Deseja excluir a lista com ID ${id}? Esta ação é irreversível!`,
    () => {
      api.delete(`api/v1/orders/${id}`)
        .then(() => processSuccess(id))
        .catch(() => showError('Erro ao remover a lista, tente novamente'))
    }
  )
}

const processSuccess = (id) => {
  showSuccessfullyRemoved('Lista removida com sucesso')
  removeElement(items.value, id)
}

</script>

<template>
  <BaseLayout>
    <template v-slot:title>
      <h4>Listas da carga com ID {{ loadId }}
        <RouterLink
          :to="`orders/create`"
          class="btn btn-success float-end"
        >
            <span>Nova Lista</span>
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
          :to="{ name: 'OrdersEdit', params: { id: data.item.id } }"
          class="btn btn-primary me-md-2"
        >
          Editar
        </RouterLink>
        <button
          @click="deleteOrder(data.item.id)"
          type="button"
          class="btn btn-outline-secondary me-md-2">
          Deletar
        </button>
        <RouterLink
          :to="{ name: 'OrderProductsIndex', params: { order_id: data.item.id } }"
          class="btn btn-primary"
        >
          Produtos da Lista
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
