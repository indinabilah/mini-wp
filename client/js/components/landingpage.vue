<template>
    <main>
        <div v-if="pageinto !== 'fill'" class="container" style="padding-top: 50px;">
            <h1 style="text-align: center; color: rgb(86, 148, 177);"> 🐼 mini wp nya indi . . . 🐼</h1>
            <hr>
            <div v-for="article in allArticle" :key="article._id">
                <div class="card text-center" >
                    <div class="card-header">
                        <p>{{article.title}}</p>
                    </div>
                    <div class="card-user text-left img-right" style="margin: 20px;">
                        <h5 class="card-title text-center">{{article.title}}</h5>
                        <img :src="article.image" alt="Image Article's" style="width: 500px;">
                        <h3 class="card-text">{{article.subtitle}}</h3>
                        <p class="card-text" v-html="article.description"></p>
                    </div>
                    <div class="card-footer bg-transparent border-info">
                        <a href="#" class="download">download </a>
                        <a href="#" class="share"><i class="tiny material-icons">share</i> </a>
                    </div>
                    <div class="card-footer">
                        <button @click="prev(article._id)" class="btn btn-outline-btn-primary">preview</button>
                    </div>
                </div>
                <hr>
            </div>
        </div>
        <div v-if="pageinto == 'fill'" class="offset" style="padding-top: 50px; padding-left: 150px; padding-rigth: 50px;">
            <div class="row">
                <div class="col-sm-4">
                    <div v-for="article in allArticle" :key="article._id">
                        <div class="card text-center" >
                            <div class="card-header">
                                <p>{{article.title}}</p>
                            </div>
                            <div class="card-user text-left img-right" style="margin: 20px;">
                                <h5 class="card-title text-center">{{article.title}}</h5>
                                <img :src="article.image" alt="Image Article's" style="width: 100px;">
                                <h3 class="card-text">{{article.subtitle}}</h3>
                                <p class="card-text" v-html="article.description"></p>
                            </div>
                            <div class="card-footer bg-transparent border-info">
                                <a href="#" class="delete"><i class="tiny material-icons">clear</i> </a>
                                <a href="#" class="edit"><i class="tiny material-icons">edit</i> </a>
                            </div>
                            <div class="card-footer">
                                <button @click="prev(article._id)" class="btn btn-outline-btn-primary">preview</button>
                            </div>
                        </div>
                        <hr>
                    </div>
                    <hr>
                </div>
                <div class="col-sm-8">
                    <div class="col-sm-6" style="position: fixed;">
                        <div class="card text-center" >
                            <div class="card-header">
                                <p>{{prevdata.title}}</p>
                            </div>
                            <div class="card-user text-left img-right" style="margin: 20px;">
                                <h5 class="card-title text-center">{{prevdata.title}}</h5>
                                <img :src="prevdata.image" alt="Image Article's" style="width: 500px;">
                                <h3 class="card-text">{{prevdata.subtitle}}</h3>
                                <p class="card-text" v-html="prevdata.description"></p>
                            </div>
                            <div class="card-footer bg-transparent border-info">
                                <p>hai you read an article</p>
                            </div>
                            <div class="card-footer">
                                <button @click="pageout" class="btn btn-outline-btn-primary">OK !</button>
                            </div>
                        </div>
                        <hr>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    props: ['keysearch'],
    data(){
        return {
            pageinto:'',
            allArticle: [],
            prevdata: {}
        }
    },
    created(){
        this.getAllArticle()
    },
    methods:{
        prev(value){
            this.pageinto = 'fill'
            // console.log('masuk ngga ya?')
            this.allArticle.forEach(el => {
                // console.log('kesini ngga?')
                if(el._id == value){
                    console.log(el)
                    this.prevdata = el
                }
            })
        },
        page(){
            this.pageinto = 'fill'
        },
        pageout(){
            this.pageinto = ''
        },
        gohome(){
            this.$emit('homepage', 'home')
        },
        gologin(){
            this.$emit('loginpage', 'login-page')
        },
        goregister(){
            this.$emit('registerpage', 'register-page')
        },
        getAllArticle() {
           axios.get('http://localhost:3000/articles')
            .then(({data}) => {
                this.allArticle = data.data
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
            })
            .then(({data})=>{
                console.log(data.data,this.keysearch, 'search')
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
