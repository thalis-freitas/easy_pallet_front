<script setup>
import BaseLayout from '../../layouts/BaseLayout.vue'
import DataTable from '@/components/DataTable.vue'
import PaginationControl from '@/components/PaginationControl.vue'
import { ref } from 'vue'
import { usePagination } from '../../composables/usePagination'
import { useRoute } from 'vue-router'

const route = useRoute()

const loadId = ref(route.params.id)

import 'sweetalert2/src/sweetalert2.scss'

const {
  items,
  pagination,
  paginationLoaded,
  totalPage,
  changePage
} = usePagination(`/api/v1/loads/${loadId.value}/orders`, 'orders')

const fields = { id: 'ID', code: 'Código', bay: 'Baia'}

</script>

<template>
  <BaseLayout>
    <template v-slot:title>
      <h4>Listas da carga com ID {{ loadId }}</h4>
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
