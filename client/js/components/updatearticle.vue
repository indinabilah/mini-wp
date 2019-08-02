<template>
    <main>
        <div class="container" style="padding-top: 50px;">
            <!-- Preview Article -->
            <div>
                <h2>Form Preview Article</h2>
                <div class="col">
                    <!-- Preview -->
                    <div id="previewArticle" class="card text-center">
                        <div class="card-header">
                            <p>{{article.title}}</p>
                        </div>
                        <div class="card-body">
                            <p><b>Title Post :</b></p>
                            <h5 class="card-title">{{article.title}}</h5>
                            <p><b>Image :</b></p>
                            <img :src="article.image" alt="" style="width: 300px"/>
                            <!-- <p>{{article.image}}</p> -->
                            <!-- <img src="" alt="Image Post" sizes="" srcset=""> -->
                            <p><b>Subtitle :</b></p>
                            <p class="card-text">{{article.subtitle}}</p>
                            <p><b>Description :</b></p>
                            <p style="white-space: pre-line;" v-html="article.description"></p>
                        </div>
                        <div class="card-footer">
                            <p>Preview Article</p>
                        </div>
                    </div>
                </div>
                <hr>
            </div>
            <!-- Form Edit -->
            <div class="card text-center" >
                <div class="card-header">
                    <p>Form Edit Articles</p>
                </div>
                <form method="post">
                    <div class="card-body">
                        <img :src="article.image" alt="Image Post">
                        <div class="input-group mb-3">
                            <div class="row">
                                <div class="input-field col-sm">
                                    <label for="title">Title Post: </label>
                                    <input placeholder="title post" type="text" v-model="article.title">
                                    <label for="subtitle">Sub-title: </label>
                                    <input placeholder="sub-title post" type="text" v-model="article.subtitle">
                                </div>
                            </div>
                            <!-- <p>
                                <wysiwyg v-model="myHTML" />
                            </p> -->
                            <div class="input-group">
                                <div class="input-group-prepend">
                                    <span class="input-group-text">Post Description</span>
                                </div>
                            </div>
                            <wysiwyg v-model="article.description"></wysiwyg>
                            <!-- <textarea class="form-control" aria-label="With textarea" v-model="article.description"></textarea> -->
                            <!-- <div id="froala-editor">
                            </div> -->
                        </div>
                        <div class="input-group mb-3" >
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="inputGroupFile">Upload</span>
                                </div>
                                <input type="text" placeholder="url address sementara . ." v-model="article.image">
                                <div class="custom-file">
                                    <input type="file" class="custom-file-input" id="inputGroupFile01"
                                    aria-describedby="inputGroupFile">
                                    <label class="custom-file-label" for="inputGroup">Choose file</label>
                                </div>
                            </div>
                        <div class="card-footer">
                            <button type="button" class="btn btn-light" @click="updatearticle">Update</button>
                        </div>
                    </div>
                </form>
                <hr>
            </div>
        </div>
    </main>
</template>

<script>
import vueWysiwyg from '../../js/vueWysiwyg.js'
export default {
    props: ['updateid'],
    data(){
        return {
            article: {
            }
        }
    },
    components: {
        wysiwyg: vueWysiwyg.component
    },
    methods:{
        updatearticle(){
            console.log(this.article, 'asd')
            axios({
                method: 'PATCH',
                url: `http://34.87.99.171/articles/${this.article._id}`,
                data: this.article,
                headers: {
                    token: localStorage.token
                }
            })
            .then(({data}) => {
                Swal.fire('Yeayy', 'Berhasil update', 'success')
                this.$emit('goingto', 'myarticles-page')
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created(){
        axios({
            method: 'GET',
            url: `http://34.87.99.171/articles/up/${this.updateid}`,
            headers: {
                token: localStorage.token
            }
        })
        .then(({data}) => {
            console.log(data.data, 'data update')
            this.article = data.data
        })
        .catch(err => {
            console.log(err)
        })
    }
}
</script>

<style>

</style>
