<template>
    <header>
        <nav class="nav justify-content-between" style="margin-right: 30px;">
        <span><img @click="go" src="https://upload.wikimedia.org/wikipedia/commons/9/93/Wordpress_Blue_logo.png" alt="Logo" width="50" class="rounded-circle" style="margin-left: 20px;"></span>
        <div class="form-inline">
            <input v-model="search" class="form-control " type="search" placeholder="Search" aria-label="Search" style="width: 500px">
        </div>
        <div class="flex-row-reverse" v-if="keypage !== 'login-page' && keypage !== 'register-page' && keypage !== 'landing-page'">
            <span class="spanUser" style="color: rgb(204, 231, 243);">Wellcome {{userlogin.username}} 😍</span>
            <div @click="formAdd" class="waves-effect waves-light btn" style="color: #ffffff"> 📄Create</div>
            <div @click="logout" class="waves-effect waves-light btn" style="color: #ffffff"> Logout</div>
        </div>
        <div class="flex-row-reverse" v-if="keypage == 'landing-page'">
            <span class="spanUser" style="color: rgb(204, 231, 243);">Wellcome 😍</span>
            <div @click="login" class="waves-effect waves-light btn" style="color: #ffffff">Log In</div>
            <div @click="register" class="waves-effect waves-light btn" style="color: #ffffff">Register</div>
        </div>
      </nav>
    </header>
</template>

<script>
export default {
    props: ['keypage','userlogin'],
    data(){
        return {
            search: '',
        }
    },
    methods:{
        go(){
            if(localStorage.token){
                this.$emit('go', 'dashboard-page')
            }else{
                Swal.fire('Login dulu kuy!')
                this.$emit('login', 'login-page')
            }
        },
        logout(){
            this.$emit('gologout', 'landing-page')
            this.username = ''
            localStorage.clear()
        },
        formAdd(){
            this.$emit('showAdd', 'add-page')
        },
        login(){
            this.$emit('login', 'login-page')
        },
        register(){
            this.$emit('register', 'register-page')
        },
        searching(){
            this.$emit('searching', this.search)
        }
    },
    watch:{
        search: function (newQuestion, oldQuestion) {
            // console.log('proses methods fetch database')
            this.searching()
        }
    }
}
</script>

<style scoped>

</style>

