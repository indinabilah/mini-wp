<template>
    <main>
        <div class="container col" style="padding-top: 50px; font-family: serif;">
            <!-- Form Add -->
            <div class="card text-center">
                <div class="card-header">
                    <h3>Form Add Articles</h3>
                </div>
                <div class="card-body">
                    <img src="" alt="Image Post">
                    <div class="input-group mb-3">
                        <div class="row">
                            <div class="input-field col-sm">
                                <label for="title">Title Post: </label>
                                <input v-model="title" placeholder="title post" type="text" >
                                <label for="subtitle">Sub-title: </label>
                                <input v-model="subtitle" placeholder="sub-title post" type="text" >
                            </div>
                        </div>
                        <div class="input-group">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Post Description</span>
                            </div>
                        </div>
                        <wysiwyg v-model="description"></wysiwyg>
                        <!-- <textarea v-model="description" class="form-control" aria-label="With textarea"></textarea>  -->
                    </div>
                    <div class="input-group mb-3" >
                            <div class="input-group-prepend">
                                <span class="input-group-text" id="inputGroupFile">Upload</span>
                            </div>
                            <input v-model="imageurl" type="text" placeholder="url address sementara . ." >
                            <div class="custom-file">
                                <input type="file" class="custom-file-input" v-on:change="uploadimage" id="inputGroupFile01"
                                aria-describedby="inputGroupFile">
                                <label class="custom-file-label" for="inputGroup">Choose file</label>
                            </div>
                        </div>
                    <div class="card-footer">
                        <button @click="createarticle" type="submit" class="btn btn-light">Publish</button>
                        <a @click="prev" class="btn btn-light" style="text-decoration:none;">Preview</a>
                    </div>
                </div>
                <hr>
            </div>
            <hr>
            <!-- Preview Article -->
            <div class="col" v-if="preview == 'fill'" style="padding-bottom: 20px;">
                <!-- Preview -->
                <div id="previewArticle" class="card text-center">
                    <div class="card-header">
                        <h3>Preview before posted</h3>
                    </div>
                    <div class="card-body">
                        <p><b>Title Post :</b></p>
                        <h5 class="card-title">{{this.title}}</h5>
                        <p><b>Image :</b></p>
                        <p>{{this.imageurl}}</p>
                        <img :src="imageurl.name" alt="Image Post" sizes="" srcset="">
                        <p><b>Subtitle :</b></p>
                        <p class="card-text">{{this.subtitle}}</p>
                        <p><b>Description :</b></p>
                        <p style="white-space: pre-line;" v-html="this.description"></p>
                    </div>
                    <div class="card-footer">
                        <a href="#" @click="ok" style="text-decoration: none;">OK !</a>
                    </div>
                </div>
            </div>
            <br><br>
        </div>
    </main>
</template>

<script>
import vueWysiwyg from '../../js/vueWysiwyg.js'
export default {
    props: ['author'],
    data(){
        return {
            preview: '',
            title:'',
            subtitle: '',
            imageurl:'',
            description:''
        }
    },
    components: {
        wysiwyg: vueWysiwyg.component
    },
    methods:{
        uploadimage(e){
            this.imageurl = e.target.files[0]
        },
        prev(){
            this.preview = 'fill'
        },
        ok(){
            this.preview = ''
        },
        createarticle(){
            console.log(this.author.id, 'masuk createarticle')
            let data = new FormData()
            data.append("title", this.title)
            data.append("subtitle", this.subtitle)
            data.append("image", this.imageurl)
            data.append("description", this.description)
            data.append("UserId", this.author.id)

            axios({
                method: "POST",
                url: "http://localhost:3000/articles",
                data: data,
                headers:{
                    token: localStorage.token
                }
            })
            .then(response => {
                console.log('berhasil create')
                this.preview = ''
                this.title = ''
                this.subtitle = ''
                this.imageurl = ''
                this.description = ''
                this.$emit('created', 'dashboard-page')
                Swal.fire('Berhasil create data', 'yeay', 'success')
            })
            .catch(err => {
                Swal.fire('Gagal create data', 'nononono!', 'error')
            })
        }
    },
    
}
</script>

<style scoped>

</style>

