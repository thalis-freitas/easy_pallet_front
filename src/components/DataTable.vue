<script setup>
import { isTableMode } from '../composables/tableUtils'

defineProps({
  items: {
    type: Array,
    required: true,
  },
  fields: {
    type: Object,
    required: true,
  },
  actions: {
    type: Boolean,
    default: false,
  },
})

</script>

<template>
<div>
  <table class="table table-bordered d-none d-md-table" v-if="isTableMode">
    <thead>
      <tr>
        <th v-for="(label, field) in fields" :key="field">
          <strong>
            {{ label }}
          </strong>
        </th>
        <th v-if="actions"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="(label, field) in fields" :key="field">{{ item[field] }}</td>
        <td v-if="actions" class="d-flex justify-content-start">
          <slot name="actions" :item="item"/>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="d-md-none" v-else>
    <div v-for="(item, index) in items" :key="index" class="card mb-3 p-2">
      <div v-for="(label, field) in fields" :key="field">
        <strong>{{ label }}</strong>:
        <span>{{ item[field] }}</span>
      </div>

      <td v-if="actions" class="d-grid gap-2 mt-2">
        <slot name="actions" :item="item"/>
      </td>
    </div>
  </div>
</div>
</template>