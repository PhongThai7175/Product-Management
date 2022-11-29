<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="product-info">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h3 class="display-5">Orders Infomation</h3>
            <router-link to="/todolist">Back</router-link>
        </div>
        
        <div class="container">
            <form @submit.prevent="save()">
                <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label">Name</label>
                <div class="col-sm-9">
                    <input type="text" 
                    class="form-control"
                    v-model="order.name"
                    @blur="validate" 
                    v-bind:class="{'is-invalid': errors.name}"
                    />
                <div class="invalid-feedback" v-if="errors.name"> {{ errors.name }}</div>
                </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Address</label>
                    <div class="col-sm-9">
                        <input type="text" 
                        class="form-control" 
                        v-model="order.address"
                        @blur="validate" 
                        v-bind:class="{'is-invalid': errors.address}"
                        />
                    <div class="invalid-feedback" v-if="errors.address"> {{ errors.address }}</div>
                    </div>  
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Status</label>
                    <div class="col-sm-9">
                        <textarea 
                        class="form-control" 
                        rows="3"
                        v-model="order.status"
                        @blur="validate" 
                        v-bind:class="{'is-invalid': order.status}"
                        >
                    </textarea>
                    <div class="invalid-feedback" v-if="errors.status"> {{ errors.status }}</div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label"></label>
                    <div class="col-sm-9 text-left">
                        <button type="submit" class="btn btn-primary">Save</button> &nbsp;
                    </div>
                </div>
            </form>
        </div>
    </div>
    
</template>

<script>
    export default {
     name: 'OrderForm',
     data() {
        return {
            errors: {
                name: '',
                address: '',
                status: '',
            },
            order:{
                name: '',
                address: '',
                status: '',
            }
        }
     },
     created() {
        let orderId = this.$route.params.id
        if (orderId) {
            this.getorder(orderId)
        }
     },
     methods: {
        validate() {
            let isValid = true

            this.errors = {
                name: '',
                address: '',
                status: '',
            }

            if(!this.order.name) {
                this.errors.name = 'Name is required'

                isValid = false
            }

            if(!this.order.position) {
                this.errors.position = 'Status is required'

                isValid = false
            }

            if(!this.order.phone) {
                this.errors.phone = 'Address is required'

                isValid = false

            } 
            return isValid
        },
        save() {
            if (this.validate()) {
                if (this.order.id) {
                    this.$request.put(`http://localhost:8000/api/users/${this.order.id}`, this.order).then(res => {
                        if (res.data.success) {
                            this.$router.push({name: 'todo.list'})
                            return
                    }

                    alert('Something went wrong')
                })

                    return;
                 }
                this.$request.post('http://localhost:8000/api/users',this.order).then(res => {
                    if (res.data.success) {
                        this.$router.push({name: 'todo.list'})
                        return
                    }

                    alert('Something went wrong')
                }) 
         }
        },

        getorder(orderId) {
            this.$request.get(`http://localhost:8000/api/users/${orderId}`).then(res => {
                this.order = res.data
            })
        }
     },
     cancel() {
        this.order.name = ''
        this.order.phone = ''
        this.order.position = ''
     }
}
</script>
