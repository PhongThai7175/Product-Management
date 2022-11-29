<template>
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-0 bg-white border-bottom shadow-sm">
    <h5 class="my-0 mr-md-auto font-weight-normal"><router-link to="/">Product Management</router-link>
    </h5>
    <nav class="my-2 my-md-0 mr-md-3">
      <!-- link về product -->
      <router-link to="/products">Products</router-link>
      <router-link to="/user">Staffs</router-link>
      <router-link to="/todolist">Order</router-link>
    </nav>
  </div>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 0px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0px 15px 0px 15px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

</style>
