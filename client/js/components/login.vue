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
                                <button @click="go" type="button" class="btn btn-light">Home</button>
                            </div>
                        </div>
                        <div class="card-footer" style="padding-left: 100px">
                            <g-signin-button
                                :params="googleSignInParams"
                                @success="onSignInSuccess"
                                @error="onSignInError">
                                Sign in with Google
                            </g-signin-button>
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
            googleSignInParams: {
                client_id: '74738138280-rdkpv4u79celq18sn7v4947v63h9qip2.apps.googleusercontent.com'
            },
            datalogin:{
                id: '',
                username:'',
                email: '',
                password: ''
            }
        }
    },
    methods:{
        // https://accounts.google.com/o/oauth2/auth?redirect_uri=storagerelay%3A%2F%2Fhttp%2Flocalhost%3A1234%3Fid%3Dauth46124&response_type=permission%20id_token&scope=email%20profile%20openid&openid.realm=&client_id=74738138280-ahnuglf065jqe38fio89a2kacmfeum2j.apps.googleusercontent.com&ss_domain=http%3A%2F%2Flocalhost%3A1234&fetch_basic_profile=true&gsiwebsdk=2
        onSignInSuccess (googleUser) {
            // `googleUser` is the GoogleUser object that represents the just-signed-in user.
        // See https://developers.google.com/identity/sign-in/web/reference#users
        const profile = googleUser.getBasicProfile() // etc etc
        console.log(profile, 'masuk google')
            axios({
                method: "POST",
                url: "http://34.87.99.171/users/login/google",
                data: {
                    name: profile.ofa,
                    email: profile.U3,
                    image: profile.Paa,
                    password: 'indicyantiikk'
                }
            })
            .then(({ data }) => {
                localStorage.setItem('token', data.jwt)
                Swal.fire('Login berhasil 😊', 'login google ::', 'success')
                this.$emit('login', {
                    pageinto: 'dashboard-page',
                    data: {
                        id: data.data.id,
                        username: data.data.name
                    }
                })
            })
            .catch(err => {
                console.log(err)
            })
        },
        onSignInError (error) {
        // `error` contains any error occurred.
        console.log('OH NOES', error)
        },
        go(){
            this.$emit('landingpage', 'landing-page')
        },
        login(){
            axios({
                method: "POST",
                url: "http://34.87.99.171/users/login",
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
                Swal.fire('Berhasil Login 😊', `welcome ${data.data.name}` , 'success')
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
                Swal.fire('Error 😭', err.response.data.error, 'error')
            })
        },
        register(){
            this.$emit('register', 'register-page')
        }

    }

}
</script>

<style>
    .g-signin-button {
    /* This is where you control how the button looks. Be creative! */
    display: inline-block;
    padding: 4px 8px;
    border-radius: 3px;
    background-color: #3c82f7;
    color: #fff;
    box-shadow: 0 3px 0 #0f69ff;
    }
</style>
