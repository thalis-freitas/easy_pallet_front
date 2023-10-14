<script setup>
import { computed, ref, watch } from 'vue'
import { isTableMode } from '../composables/tableUtils'

const props = defineProps({
  pagination: {
    type: Object,
    required: true,
  }
})

const emit = defineEmits(['page-changed'])

const currentPage = ref(props.pagination.current_page)

const totalPage = ref(Math.ceil(
  props.pagination.total_items / props.pagination.items_per_page
))

const changePage = (page) => {
  if (page < 1 || page > totalPage.value) return
  currentPage.value = page

  emit('page-changed', page)
}

watch(props.pagination, (newPagination) => {
  totalPage.value = Math.ceil(
    newPagination.total_items / newPagination.items_per_page
  )
})

const pagesToShow = computed(() => {
  const maxPages = isTableMode.value ? 8 : 5
  const totalPages = totalPage.value

  const start = Math.max(1, Math.min(
    currentPage.value - Math.floor(maxPages / 2), totalPages - maxPages + 1
  ))

  const end = Math.min(start + maxPages - 1, totalPages)

  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
})

</script>

<template>
  <nav v-if="totalPage > 1" aria-label="Page navigation">
    <ul class="pagination">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a
          role="button"
          class="page-link"
          @click="changePage(currentPage - 1)"
          aria-label="Previous"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        role="button"
        class="page-item"
        v-for="page in pagesToShow"
        :key="page"
        :class="{ active: currentPage === page || page === '...' }"
      >
        <a class="page-link" @click="changePage(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ disabled: currentPage === totalPage }">
        <a
          role="button"
          class="page-link"
          @click="changePage(currentPage + 1)"
          aria-label="Next"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
