<!-- eslint-disable vue/multi-word-component-names -->
<template> 
    <div class="product-list"> 
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
    <h2 class="display-4">Staff Management</h2>
       <!-- them moi -->
    <p><router-link to='/user/create'>Add Staff</router-link></p> 
  </div>

  <div class="container">
    <div class="card-deck mb-3 text-center">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th scope="col" width = "120">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Phone number</th>
            <th scope="col">Position</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr :key = "index" v-for="(user, index) in users">
            <th scope="row">{{ user.id }}</th>
            <td>{{ user.name }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.position }}</td>
            <td>
              <router-link :to="{ name: 'user.edit' , params: {id: user.id} }">
                <button class="btn btn-primary">Edit</button> 
              </router-link>
              &nbsp;
              <button class="btn btn-danger" @click="onDelete(user.id)">Delete</button>
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
  name: 'UserForm',
   data() {
    return {
      users: []
    }
   },
   created() {
    this.getAll()
   },
   methods: {
    getAll() {
      this.$request.get('http://localhost:8000/api/users').then( res => {
        this.users = res.data
      })
    },
    onDelete(userId){
      this.$swal.fire({
        title: 'Are you sure?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Sure',
      }).then((result) => {
        if (result.isConfirmed) {
          this.$request.delete(`http://localhost:8000/api/users/${userId}`).then( res => {
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