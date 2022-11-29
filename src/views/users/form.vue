<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="product-info">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h3 class="display-5">Staff Infomation</h3>
            <router-link to="/user">Back</router-link>
        </div>
        
        <div class="container">
            <form @submit.prevent="save()">
                <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label">Staff Name</label>
                <div class="col-sm-9">
                    <input type="text" 
                    class="form-control"
                    v-model="user.name"
                    @blur="validate" 
                    v-bind:class="{'is-invalid': errors.name}"
                    />
                <div class="invalid-feedback" v-if="errors.name"> {{ errors.name }}</div>
                </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Phone Number</label>
                    <div class="col-sm-9">
                        <input type="text" 
                        class="form-control" 
                        v-model="user.phone"
                        @blur="validate" 
                        v-bind:class="{'is-invalid': errors.phone}"
                        />
                    <div class="invalid-feedback" v-if="errors.phone"> {{ errors.phone }}</div>
                    </div>  
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Staff Position</label>
                    <div class="col-sm-9">
                        <textarea 
                        class="form-control" 
                        rows="3"
                        v-model="user.position"
                        @blur="validate" 
                        v-bind:class="{'is-invalid': errors.position}"
                        >
                    </textarea>
                    <div class="invalid-feedback" v-if="errors.position"> {{ errors.position }}</div>
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
     name: 'UserForm',
     data() {
        return {
            errors: {
                name: '',
                phone: '',
                position: '',
            },
            user:{
                name: '',
                phone: '',
                position: '',
            }
        }
     },
     created() {
        let userId = this.$route.params.id
        if (userId) {
            this.getUser(userId)
        }
     },
     methods: {
        validate() {
            let isValid = true

            this.errors = {
                name: '',
                phone: '',
                position: '',
            }

            if(!this.user.name) {
                this.errors.name = 'Staff name is required'

                isValid = false
            }

            if(!this.user.position) {
                this.errors.position = 'Staff position is required'

                isValid = false
            }

            if(!this.user.phone) {
                this.errors.phone = 'Phone is required'

                isValid = false

            } else if (!this.isNumber(this.user.phone)) {
                this.errors.phone = 'Phone must is number'
                isValid = false
            }

            return isValid
        },
        isNumber(value) {
            return /^\d*$/.test(value)
        },
        save() {
            if (this.validate()) {
                if (this.user.id) {
                    this.$request.put(`http://localhost:8000/api/users/${this.user.id}`, this.user).then(res => {
                        if (res.data.success) {
                            this.$router.push({name: 'user.list'})
                            return
                    }

                    alert('Something went wrong')
                })

                    return;
                 }
                this.$request.post('http://localhost:8000/api/users',this.user).then(res => {
                    if (res.data.success) {
                        this.$router.push({name: 'user.list'})
                        return
                    }

                    alert('Something went wrong')
                }) 
         }
        },

        getUser(userId) {
            this.$request.get(`http://localhost:8000/api/users/${userId}`).then(res => {
                this.user = res.data
            })
        }
     },
     cancel() {
        this.user.name = ''
        this.user.phone = ''
        this.user.position = ''
     }
}
</script>
