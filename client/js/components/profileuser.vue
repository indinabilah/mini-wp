<template>
    <main>
        <div class="container" style="padding-top: 50px;">
            <h1 style="font-family: serif;">Profile</h1>
            <div class="row">
                <div class="col-sm 5">
                    <img src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c5704c5d-ea96-4b28-9347-360fbae3ddb9/d4hdq21-70b10960-4241-4c5a-ad6c-d5f2d1c3a171.png/v1/fill/w_467,h_350,strp/fuko_ibuki_by_ueruchan77_d4hdq21-350t.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Njc1IiwicGF0aCI6IlwvZlwvYzU3MDRjNWQtZWE5Ni00YjI4LTkzNDctMzYwZmJhZTNkZGI5XC9kNGhkcTIxLTcwYjEwOTYwLTQyNDEtNGM1YS1hZDZjLWQ1ZjJkMWMzYTE3MS5wbmciLCJ3aWR0aCI6Ijw9OTAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.pYJk1MAbu0U-XIGEWQ9aCc1c5LRZqugc601uxiMNhGA" alt="image user">
                    <h4>username : {{userlogin.username}}</h4>
                    <h4>email    : {{userlogin.email}}</h4>
                    <button @click="edit">edit</button>
                </div>
                <div v-if="page == 'edit'" class="col-sm 5">
                    <p>edit nih</p>
                    <img :src="image" alt="image user">
                    <h4>username : {{username}}</h4>
                    <input v-model="username" type="text">
                    <h4>email    : {{email}}</h4>
                    <input v-model="email" type="text">
                    <br>
                    <button @click="done">done</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    props: ['userlogin'],
    data(){
        return{
            page: '',
            username: this.userlogin.username,
            email: this.userlogin.email,
            password: this.userlogin.password,
            image: this.userlogin.image
        }
    },
    methods:{
        edit(){
            this.page = 'edit'
        },
        done(){
            this.page = ''
            Swal.fire('Belum update', 'masih nampilin biasa', 'error')
        }
    }
}
</script>

<style>

</style>
