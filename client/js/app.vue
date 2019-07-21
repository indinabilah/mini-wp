<template>
  <div>
      <!-- Header -navbar -->
      <headers v-if="page !== 'register-page' && page !== 'login-page'" 
      @showAdd="goingto" 
      @searching="searchInput" 
      @gologout="goingto" 
      @go="goingto"
      @login="goingto"
      @register="goingto"
      v-bind:keypage="page"
      v-bind:keysearch="search"
      v-bind:userlogin="datalogin"></headers>
      <!-- Landing Page -->
      <landingpage v-if="page == 'landing-page'" 
      @homepage="goingto" 
      @loginpage="goingto" 
      @registerpage="goingto"
      v-bind:keysearch="search"></landingpage>
      <!-- Login Register Page -->
      <div class="container">
            <login v-show="page == 'login-page'" @landingpage="goingto"
            @login="toupdate" 
            @register="goingto"></login>
            <register v-if="page == 'register-page'" @landingpage="goingto"
            @login="goingto" 
            @register="goingto"></register>
      </div>
      <!-- Content Page -->
      <div class="row">
          <div class="col-sm-2">
              <sidebar v-if="page !== 'landing-page' && page !== 'register-page' && page !== 'login-page'"
              @dashboardlivepage="goingto"
              @profilepage="goingto"
              @myarticlespage="goingto"
              @deletedpostpage="goingto"
              ></sidebar>
          </div>
          <div class="col-sm-6">
              <dashboardlive v-if="page == 'dashboard-page'" v-bind:keysearch="search"></dashboardlive>
              <addarticle v-if="page == 'add-page'" @created="goingto" v-bind:author="datalogin"></addarticle>
              <userarticles v-if="page == 'myarticles-page'" v-bind:keysearch="search" :userid="datalogin.id" @update="toupdate"></userarticles>
              <updatearticle v-if="page == 'update-page'" v-bind:updateid="updateid" @goingto="goingto"></updatearticle>
              <profilepage v-if="page == 'profile-page'" :userlogin="datalogin"></profilepage>
              <deletedpostpage v-if="page == 'deletedpost-page'" v-bind:keysearch="search"></deletedpostpage>
          </div>
      </div>
      <foot></foot>
  </div>
</template>

<script>
import headers from './components/header'
import sidebar from './components/sidebar'

import login from './components/login'
import register from './components/register'
import landingpage from './components/landingpage'
import profilepage from './components/profileuser'

import addarticle from './components/addarticle'
import dashboardlive from './components/dashboardlive'
import userarticles from './components/userarticles'
import updatearticle from './components/updatearticle'

import deletedpostpage from './components/deletedpost'
import foot from './components/foot'

export default {
  data() {
    return {
      page: 'landing-page',
      search: '',
      datalogin: {},
      dataregister: {},
      updateid: ''
    }
  },
  components:{
      headers, sidebar, 
      login, register, landingpage, profilepage,
      addarticle, dashboardlive, userarticles, updatearticle,
      deletedpostpage, foot,
  },
  methods:{
    toupdate(val){
      console.log(val,'masuk')
      this.page = val.pageinto
      this.updateid = val.id
      this.datalogin = val.data
    },
    goingto(value){
      this.page = value
      this.updateid = value.id
    },
    searchInput(value){
      this.search = value
    }
  },
  created(){
    if(localStorage.token){
      this.page = 'dashboard-page'
      axios({
        method: 'GET',
        url: 'http://localhost:3000/users/userdata',
        headers: {
          token: localStorage.token
        }
      })
      .then(({data}) => {
        this.datalogin = data.user
        console.log(data.user, 'hehheheheheheheh')
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
};
</script>

<style>
</style>