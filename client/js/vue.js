new Vue({
        el:'#app',
        data:{
            articles: [],
            search: '',
            answer: [],
            answer2:'',
            formAdd: {
                title:'',
                subtitle:'',
                description:'',
                image:'',
            },
            formEdit: {
                id: '',
                title:'',
                subtitle:'',
                description:'',
                image:'',
            },
            preview: {}
        },
        methods:{
            addArticle(){
                console.log(this.formAdd)
                axios({
                    method: 'POST',
                    url: 'http://localhost:3000/articles',
                    data:{
                        id: this.articles.length,
                        title: this.formAdd.title,
                        subtitle: this.formAdd.subtitle,
                        description: this.formAdd.description,
                        image: this.formAdd.image
                    }
                })
                .then(({data})=>{
                    this.articles.push(data)
                    this.formAdd.title = ''
                    this.formAdd.subtitle = ''
                    this.formAdd.description = ''
                    this.formAdd.image = ''
                })
                .catch(err => {
                    console.log(err)
                })
            },
            getAllArticle(){
                axios({
                    method: 'GET',
                    url: 'http://localhost:3000/articles',
                })
                .then(({data})=>{
                    this.articles = data.data
                })
                .catch(err => {
                    console.log(err)
                })
            },
            getFind(){
                console.log(this.articles)
                axios({
                    method: 'GET',
                    url: 'http://localhost:3000/articles',
                })
                .then(({data})=>{
                    this.articles = []
                    data.data.forEach(element => {
                        if (element.title.toLowerCase().includes(this.search.toLowerCase())) {
                            this.articles.push(element)
                            console.log('masuk sini')
                            this.answer2 = 'Waiting you stop writing . . .'
                            return
                        } else {
                            this.answer2 = 'not found 😭'
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                })
            },
            updateForm(value){
                axios({
                    method: 'GET',
                    url: `http://localhost:3000/articles/${value}`,
                })
                .then(({data})=>{
                    const getData = data.data
                    console.log(data, 'ini ibu budi lg update')
                    this.formEdit.id = getData._id
                    console.log(getData._id, 'apanih')
                    this.formEdit.title = getData.title
                    this.formEdit.subtitle = getData.subtitle
                    this.formEdit.description = getData.description
                    this.formEdit.image = getData.image
                })
                .catch(err => {
                    console.log(err)
                })
            },
            updateArticle(value){
                console.log(value, 'disini katanya objectID')
                axios({
                    method: 'PATCH',
                    url: `http://localhost:3000/articles/${value}`,
                    data: {
                        title: this.formEdit.title,
                        subtitle: this.formEdit.subtitle,
                        description: this.formEdit.description,
                        image: this.formEdit.image,
                    }
                })
                .then(({data})=>{
                    this.answer2 = `${this.formEdit.title} data updated !!!`
                    this.formEdit.id = ''
                    this.formEdit.title = ''
                    this.formEdit.subtitle = ''
                    this.formEdit.description = ''
                    this.formEdit.image = ''
                    this.getAllArticle()
                })
                .catch(err => {
                    console.log(err)
                })
            },
            deleteArticle(value){
                console.log(typeof value)
                axios({
                    method: 'DELETE',
                    url: `http://localhost:3000/articles/${value}`,
                })
                .then(({data})=>{
                    this.answer2 = 'data delted !!!'
                    this.getAllArticle()
                })
                .catch(err => {
                    console.log(err)
                })
            }
        },
        watch: {
            search: function (newQuestion, oldQuestion) {
                console.log('proses methods fetch database')
                this.getFind()
            }
        },
        created() {
            this.getAllArticle()
        }
    });