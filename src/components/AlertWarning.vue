<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  }
})
</script>

<template>
  <div class="alert alert-warning text-center shadow border border-0">
    {{ message }}
  </div>
</template>