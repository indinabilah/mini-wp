<template>
    <main>
        <!-- Register -->
        <div class="container">
            <div id="formRegister">
                <div class="card text-center">
                    <div class="card-header">
                        <p>Form Register</p>
                    </div>
                    <div class="card-user text-left" style="margin: 20px;">
                        <form class="p-4" >
                            <div class="form-group">
                                <img src="https://img.icons8.com/bubbles/50/000000/groups.png">
                                <label for="username">Username: </label>
                                <input v-model="username" type="text" class="form-control" id="Username" placeholder="username . . ">
                            </div>
                            <div class="form-group">
                                <img src="https://img.icons8.com/bubbles/50/000000/gmail.png">
                                <label for="email">Email: </label>
                                <input v-model="email" type="email" class="form-control" placeholder="user@example.com">
                            </div>
                            <div class="form-group">
                                <img src="https://img.icons8.com/bubbles/50/000000/lock-2.png">
                                <label for="password">Password: </label>
                                <input v-model="password" type="password" class="form-control" placeholder="Password">
                            </div>
                            <button @click="register" type="button" class="btn btn-warning">Register</button>
                            <button @click="login" type="button" class="btn btn-primary">Sign in</button>
                            <button @click="go" type="button" class="btn btn-light">Home</button>

                        </form>
                    </div>
                    <div class="card-footer">
                        <h1 @click="go"> 🐼</h1> Mini WP @2019</div>
                </div>
            </div>
        </div>
        <hr>
    </main>
</template>

<script>
export default {
    data(){
        return {
            username: '',
            email: '',
            password:''
        }
    },
    methods:{
        go(){
            this.$emit('landingpage', 'landing-page')
        },
        register(){
            axios({
                method: "POST",
                url: "http://localhost:3000/users",
                data:{
                    username: this.username,
                    email: this.email,
                    password:this.password
                }
            })
            .then(({data}) => {
                console.log(data, 'regis')
                Swal.fire('Berhasil register', 'yeay', 'success')
                this.$emit('login', 'login-page')
            })
            .catch(err => {
                console.log(err.response)
                Swal.fire('Error 😭', err.response.data.error, 'error')
            })
        },
        login(){
            this.$emit('login', 'login-page')
        }
    }

}
</script>

<style>

</style>
