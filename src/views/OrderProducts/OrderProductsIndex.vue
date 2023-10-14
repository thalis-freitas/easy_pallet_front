<script setup>
import api from '@/services/api'
import BaseLayout from '../../layouts/BaseLayout.vue'
import DataTable from '@/components/DataTable.vue'
import { onMounted, ref } from 'vue'
import { showError } from '../../composables/useSweetAlert.js'
import { useRoute } from 'vue-router'

const route = useRoute()

const orderId = ref(route.params.order_id)

const orderProducts = ref([])

onMounted(() => getOrderProducts())

const getOrderProducts = () => {
  api.get(`/api/v1/orders/${orderId.value}/order_products`)
    .then(res => {
      orderProducts.value = res.data
    })
    .catch(() => showError('Ocorreu um erro ao obter os dados da tabela'))
}

const fields = { id: 'ID', product_id: 'ID do Produto', quantity: 'Quantidade'}

</script>

<template>
  <BaseLayout>
    <template v-slot:title>
      <h4>Produtos da lista com ID {{ orderId }}
        <RouterLink
        :to="{ name: 'OrderProductsCreate', params: { order_id: orderId } }"
          class="btn btn-success float-end"
        >
            <span>Nova Lista</span>
        </RouterLink>
      </h4>
    </template>

    <DataTable
      :items="orderProducts"
      :fields="fields"
      :actions="true"
    >
      <template v-slot:actions="data">
        <RouterLink
          :to="{
            name: 'OrderProductsEdit',
            params: { order_id: orderId, id: data.item.id }
          }"
          class="btn btn-primary me-md-2"
        >
          Editar
        </RouterLink>
      </template>
    </DataTable>
  </BaseLayout>
</template>
