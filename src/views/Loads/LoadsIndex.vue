<script setup>
import BaseLayout from '../../layouts/BaseLayout.vue'
import DataTable from '@/components/DataTable.vue'
import PaginationControl from '@/components/PaginationControl.vue'
import { usePagination } from '../../composables/usePagination'

const {
  items,
  pagination,
  paginationLoaded,
  totalPage,
  changePage
} = usePagination('/api/v1/loads', 'loads')

const fields = { id: 'ID', code: 'Código', delivery_date: 'Data de Entrega' }

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

    <DataTable
      :items="items"
      :fields="fields"
      :actions="true"
    >
    </DataTable>

    <PaginationControl
      v-if="paginationLoaded"
      :pagination="pagination"
      :total-page="totalPage"
      @page-changed="changePage"
    />

  </BaseLayout>
</template>
