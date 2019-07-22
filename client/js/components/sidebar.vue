<template>
    <main>
        <div class="bg-light border-right"  id="sidebar" style="">
            <div class="list-group list-group-flush" >
                <a @click="dashboardlive" style="color: rgb(86, 148, 177);" href="#" class="list-group-item list-group-item-action bg-light"><i class="tiny material-icons">dashboard</i> Dashboard</a>
                <a @click="profile" style="color: rgb(86, 148, 177);" href="#" class="list-group-item list-group-item-action bg-light"><i class="tiny material-icons">account_circle</i> Profile</a>
                <a @click="myarticles" style="color: rgb(86, 148, 177);" href="#" class="list-group-item list-group-item-action bg-light"><i class="tiny material-icons">list</i> My Articles</a>
                <a @click="deletedpost" style="color: rgb(86, 148, 177);" href="#" class="list-group-item list-group-item-action bg-light"><i class="tiny material-icons">delete_sweep</i> Deleted Post</a>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data(){
        return {}
    },
    methods:{
        dashboardlive(){
            this.$emit('dashboardlivepage', 'dashboard-page')
        },
        profile(){
            this.$emit('profilepage', 'profile-page')
        },
        myarticles(){
            this.$emit('myarticlespage', 'myarticles-page')
        },
        deletedpost(){
            Swal.fire('😂', 'maaf ya belom', 'success')
            this.$emit('deletedpostpage', 'deletedpost-page')
        }
    }
}
</script>

<style>

</style>
