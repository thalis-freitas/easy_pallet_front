<script setup>
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <NavBar/>
    </div>
  </header>

  <div class="container">
    <div class="card mt-4 mb-4 border border-2">
      <div class="card-header bg-dark text-light">
        <slot name="title"/>
      </div>

      <div class="card-body">
        <slot/>
      </div>
    </div>
  </div>
</template>
