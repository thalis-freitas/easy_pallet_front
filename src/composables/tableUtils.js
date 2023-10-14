import { computed } from 'vue'

export const isTableMode = computed(() => {
  return window.innerWidth >= 768
})

export const removeElement = (items, id) => {
  const index = items.findIndex(item => item.id === id)

  if (index !== -1) {
    items.splice(index, 1)
  }
}
