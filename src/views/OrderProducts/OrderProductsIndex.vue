<script setup>
import api from '@/services/api'
import BaseLayout from '../../layouts/BaseLayout.vue'
import DataTable from '@/components/DataTable.vue'
import { onMounted, ref } from 'vue'
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
}

const fields = { id: 'ID', product_id: 'ID do Produto', quantity: 'Quantidade'}
</script>

<template>
  <BaseLayout>
    <template v-slot:title>
      <h4>Produtos da lista com ID {{ orderId }}</h4>
    </template>

    <DataTable
      :items="orderProducts"
      :fields="fields"
      :actions="true"
    >
    </DataTable>
  </BaseLayout>
</template>
