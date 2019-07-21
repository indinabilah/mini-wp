<template>
    <main>
        <!-- Login -->
        <div class="container">
            <div class="col-sm-8">
                <div id="formLogin">
                    <div class="card text-center">
                        <div class="card-header">
                            <p>Form Login</p>
                        </div>
                        <div class="card-user text-left" style="margin: 20px;">
                            <div class="form-group">
                                <img src="https://img.icons8.com/bubbles/50/000000/gmail.png">
                                <label for="email">Email address</label>
                                <input v-model="datalogin.email" type="email" class="form-control" placeholder="email@example.com" >
                            </div>
                            <div class="form-group">
                                <img src="https://img.icons8.com/bubbles/50/000000/lock-2.png">
                                <label for="password">Password</label>
                                <input v-model="datalogin.password" type="password" class="form-control" placeholder="Password">
                            </div>
                            <div style="align-items: center;">
                                <button @click="login" type="button" class="btn btn-light">Sign in</button>
                                <img @click="go" src="../../css/img/login.gif"  alt="login-gif">
                                <button @click="register" type="button" class="btn btn-warning">Register</button>
                            </div>
                        </div>
                        <div class="card-footer" style="padding-left: 100px">
                            <div class="g-signin2" data-onsuccess="onSignIn"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data(){
        return{
            datalogin:{
                id: '',
                username:'',
                email: '',
                password: ''
            }
        }
    },
    methods:{
        go(){
            this.$emit('landingpage', 'landing-page')
        },
        login(){
            axios({
                method: "POST",
                url: "http://localhost:3000/users/login",
                data: {
                    email: this.datalogin.email,
                    password: this.datalogin.password
                }
            })
            .then(({data}) => {
                localStorage.setItem('token', data.jwt)
                console.log(data)
                console.log('berhasil login')
                this.datalogin.id = data.data.id
                this.datalogin.username = data.data.name
                Swal.fire('HAHAHAHA', 'hmmmm', 'success')
                this.$emit('login', {
                    pageinto: 'dashboard-page',
                    data: {
                        id: data.data.id,
                        username: data.data.name
                    }
                })
            })
            .catch(err => {
                console.log(err.response)
                Swal.fire('Error', err.response.data.error, 'error')
            })
        },
        register(){
            this.$emit('register', 'register-page')
        }

    }

}
</script>

<style>

</style>
