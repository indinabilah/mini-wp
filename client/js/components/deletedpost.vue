<template>
    <main>
        <div class="col" style="padding-top: 20px;">
            <p>deleted post</p>
            <div class="card text-center" >
                <div class="card-header">
                    <p>article.title</p>
                </div>
                <div class="card-user text-left img-right" style="margin: 20px;">
                    <h5 class="card-title text-center">article.title</h5>
                    <img src="" alt="Image Article's">
                    <h3 class="card-text">article.subtitle</h3>
                    <p class="card-text">article.description</p>
                </div>
                <div class="card-footer bg-transparent border-info">
                    <a href="#" class="delete"><i class="tiny material-icons">clear</i> </a>
                    <a href="#" class="edit"><i class="tiny material-icons">edit</i> </a>
                </div>
                <div class="card-footer">
                    <button class="btn btn-outline-btn-primary">preview</button>
                </div>
            </div>
            <hr>
            <div class="card text-center" >
                <div class="card-header">
                    <p>article.title</p>
                </div>
                <div class="card-user text-left img-right" style="margin: 20px;">
                    <h5 class="card-title text-center">article.title</h5>
                    <img src="" alt="Image Article's">
                    <h3 class="card-text">article.subtitle</h3>
                    <p class="card-text">article.description</p>
                </div>
                <div class="card-footer bg-transparent border-info">
                    <a href="#" class="delete"><i class="tiny material-icons">clear</i> </a>
                    <a href="#" class="edit"><i class="tiny material-icons">edit</i> </a>
                </div>
                <div class="card-footer">
                    <button class="btn btn-outline-btn-primary">preview</button>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    props: ['keysearch'],
    data(){
        return {}
    }
}
</script>

<style>

</style>
