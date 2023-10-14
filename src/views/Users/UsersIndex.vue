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
} = usePagination('/api/v1/users', 'users')

const fields = { id: 'ID', name: 'Nome', login: 'Login' }

</script>

<template>
  <BaseLayout>
    <template v-slot:title>
      <h4>Usuários</h4>
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
