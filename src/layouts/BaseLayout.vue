<template>
  <div class="container">
    <div class="card mt-4 mb-4">

      <div class="card-header bg-dark text-light">
        <slot name="title"/>
      </div>

      <div class="card-body">
        <slot/>
      </div>
    </div>
  </div>
</template>
