<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
    <div class="container">
      <RouterLink class="navbar-brand" to="/">Easy Pallet</RouterLink>
    </div>
  </nav>

  <div class="container">
    <div class="row justify-content-center mt-5">
      <div class="col-md-6">
        <div class="card mt-4 mb-4 border-2">

          <div class="card-header bg-dark text-light">
            <slot name="title"/>
          </div>

          <div class="card-body">
            <slot/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
