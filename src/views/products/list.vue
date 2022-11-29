<!-- eslint-disable vue/multi-word-component-names -->
<template> 
    <div class="product-list"> 
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
    <h2 class="display-4">Products Management</h2>
       <!-- thêm mới -->
    <p><router-link to='/products/create'>Add Product</router-link></p> 
  </div>

  <div class="container">
    <div class="card-deck mb-3 text-left">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" width = "120">ID</th>
            <th scope="col">Product name</th>
            <th scope="col">Price</th>
            <th scope="col">Description</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr :key = "index" v-for="(product, index) in products">
            <th scope="row">{{ product.id }}</th> 
            <td>{{ product.name }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.description }}</td>
            <td>
              <router-link :to="{ name: 'product.edit' , params: {id: product.id} }">
                <button class="btn btn-primary">Edit</button> 
              </router-link>
              &nbsp;
              <button class="btn btn-danger" @click="onDelete(product.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
    </div>
</template>

<script>
export default {
  name: 'ProductForm',
   data() {
    return {
      products: []
    }
   },
   created() {
    this.getAll()
   },
   methods: {
    getAll() {
      this.$request.get('http://localhost:8000/api/products').then( res => {
        this.products = res.data
      })
    },
    onDelete(productId){
      this.$swal.fire({
        title: 'Are you sure?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Sure',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$request.delete(`http://localhost:8000/api/products/${productId}`).then( res => {
            if (res.data.success) {
              this.$swal.fire('Done!', '', 'success')
              this.getAll()
            }
          })
        } 
      })
    }

  }
}
  </script>