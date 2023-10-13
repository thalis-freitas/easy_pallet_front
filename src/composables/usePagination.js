import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

export function usePagination(apiUrl, itemName) {
  const items = ref([])
  const pagination = ref(null)
  const paginationLoaded = ref(false)

  const totalPage = computed(() => {
    if (pagination.value) {
      return Math.ceil(
        pagination.value.total_items / pagination.value.items_per_page
      )
    }
    return 1
  })

  const getItems = (page) => {
    axios.get(`${apiUrl}?page=${page}`).then((res) => {
      items.value = res.data[itemName]
      pagination.value = res.data.meta
      paginationLoaded.value = true
    })
  }

  const changePage = (page) => {
    if (page < 1 || !pagination.value || page > totalPage.value) return
    pagination.value.current_page = page
    getItems(page)
  }

  onMounted(() => getItems(1))

  return {
    items,
    pagination,
    paginationLoaded,
    totalPage,
    changePage,
  }
}
