<script setup>
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
  <table class="table table-bordered">
    <thead>
      <tr>
        <th v-for="(label, field) in fields" :key="field">{{ label }}</th>
        <th v-if="actions"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td v-for="(label, field) in fields" :key="field">{{ item[field] }}</td>
        <td v-if="actions" class="d-flex justify-content-evenly">
          <slot name="actions" :item="item"></slot>
        </td>
      </tr>
    </tbody>
  </table>
</template>