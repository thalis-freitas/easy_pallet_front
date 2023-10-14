import { computed } from 'vue'

export const isTableMode = computed(() => {
  return window.innerWidth >= 768
})
