<!-- eslint-disable vue/multi-word-component-names -->
<template> 
    <div class="product-list"> 
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
    <h2 class="display-4">Orders Management</h2>
       <!-- them moi -->
    <p><router-link to='/todolist/create'>New Orders</router-link></p> 
  </div>

  <div class="container">
    <div class="card-deck mb-3 text-center">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" width = "120">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Address</th>
            <th scope="col">Day</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr :key = "index" v-for="(order, index) in orders">
            <th scope="row">{{ order.id }}</th>
            <td>{{ order.name }}</td>
            <td>{{ order.address }}</td>
            <td>{{ order.day }}</td>
            <td>
              <router-link :to="{ name: 'todo.edit' , params: {id: order.id} }">
                <button class="btn btn-primary">Edit</button> 
              </router-link>
              &nbsp;
              <button class="btn btn-danger" @click="onDelete(order.id)">Delete</button>
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
  name: 'OrderForm',
   data() {
    return {
      orders: []
    }
   },
   created() {
    this.getAll()
   },
   methods: {
    getAll() {
      this.$request.get('http://localhost:4200').then( res => {
        this.orders = res.data
      })
    },
    onDelete(orderId){
      this.$swal.fire({
        title: 'Are you sure?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Sure',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$request.delete(`http://localhost:4200 ${orderId}`).then( res => {
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