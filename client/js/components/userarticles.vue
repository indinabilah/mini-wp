<template>
    <main>
        <div class="col" style="padding-top: 20px;">
            <p>user articles</p>
            <div class="card text-center" v-for="article in allArticle" :key="article._id" >
                <div class="card-header">
                    <p>{{article.title}}</p>
                </div>
                <div class="card-user text-left img-right" style="margin: 20px;">
                    <h5 class="card-title text-center">{{article.title}}</h5>
                    <img src="" alt="Image Article's">
                    <h3 class="card-text">{{article.subtitle}}</h3>
                    <p class="card-text">{{article.description}}</p>
                </div>
                <div class="card-footer bg-transparent border-info">
                    <button @click="updatearticle(article._id)" type="button">edit</button>
                    <button @click="deletearticle(article._id)" type="button">delete</button>
                </div>
                <div class="card-footer">
                    <p>{{Date(article.createdAt)}}</p>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    props: ['keysearch', 'userid'],
    data(){
        return {
            allArticle: [],
            answer2:''
        }
    },
    created(){
        this.getAllArticle()
    },
    methods:{
        deletearticle(id){
            Swal.fire('😂', 'belom ya ampun', 'success')
            axios({
                method: "DELETE",
                url: `http://localhost:3000/articles/${id}`,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                Swal.fire('Yeaayy', 'Article deleted', 'success')
                this.getAllArticle()
            })
            .catch(err => {
                console.log(err)
            })
        },
        updatearticle(id){
            console.log(id, 'masuk di update')
            this.$emit('update', {
                pageinto: 'update-page',
                id
            })
        },
        getAllArticle() {
            axios({
                method: "GET",
                url: 'http://localhost:3000/articles',
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                let find = data.data
                find.forEach(el =>{
                    if(el.UserId == this.userid){
                        this.allArticle.push(el)
                    }
                })
                if(this.allArticle.length == 0){
                    Swal.fire('Data not found!', 'Anda belum membuat sebuah article', 'error')
                }
            })
            .catch((err) => {
                console.log(err.response.data.message)
            })
       },
       searchArticle(){
            console.log(this.keys)
            this.search = this.keysearch
            axios({
                method: 'GET',
                url: 'http://localhost:3000/articles',
                headers:{
                    token: localStorage.token
                }
            })
            .then(({data})=>{
                this.allArticle = []
                data.data.forEach(element => {
                    if (element.title.toLowerCase().includes(this.keysearch.toLowerCase())) {
                        this.allArticle.push(element)
                        console.log('masuk sini nih')
                        this.answer2 = 'Waiting for you stop writing . . .'
                        this.search = ''
                        return
                    } else {
                        this.search = ''
                        this.answer2 = 'not found 😭'
                    }
                })
            })
            .catch(err => {
                this.search = ''
                console.log(err)
            })
        },
    },
    watch:{
        keysearch: function (newQuestion, oldQuestion) {
            // console.log('proses methods fetch database')
            this.searchArticle()
        }
    }
}
</script>

<style>

</style>
