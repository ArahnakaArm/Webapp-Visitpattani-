<template>
  <v-app>
    <v-toolbar color="#26a69a" >
      
      
      <v-spacer></v-spacer>
      
      
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn @click="goBoard" small ma0 flat color="white">
          <span >สถิติ</span>
        </v-btn>
        <v-btn  @click="goMap" small ma0 flat color="white">
          <span>ติดตาม</span>
        </v-btn>
        <v-btn  @click="goAdd" small ma0 flat color="white">
          <span>เพิ่มสถานที่</span>
        </v-btn>
        <v-btn  @click="goListNews" small ma0 flat color="white">
          <span>ข่าวกิจกรรม</span>
        </v-btn>
        <v-btn  @click="goList" small ma0 flat color="white">
          <span>ของฝาก</span>
        </v-btn>
        
        
        <v-icon style="margin-left:20px" color="white" href="wave-light" v-on:click="logout">exit_to_app</v-icon>
      </v-toolbar-items>
      <v-menu>
        <v-toolbar-side-icon class="hidden-md-and-up" slot="activator"></v-toolbar-side-icon>
        <v-list>
          <v-list-tile
            v-for="item in items"
            :key="item"
            @click=""
            :to="item.link"
          >
            <v-list-tile-title v-text="item.text"></v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-list><v-icon style="margin-left:20px" href="wave-light" v-on:click="logout">exit_to_app</v-icon></v-list>
      </v-menu>
      
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import firebase from 'firebase'
import Home from './components/Home'
import Vue from 'vue'
import Vuetify from 'vuetify'
 
Vue.use(Vuetify)
export default {
  name: 'App',
  data () {
    return {
      items: [
        { text: 'Home', link: '/home'},
        { text: 'Cartoon', link: '/cartoon'},
        { text: 'Contact', link: '/contact'},
      ]
    }
  },
  methods: {
    logout: function () {
      firebase.auth().signOut().then(() => {
        this.$router.replace('login')
      })
    },
     goBoard: function () {
      
        this.$router.push('board')
    
    },
     goMap: function () {
     
        this.$router.push('map')
     
    },
      goAdd: function () {
     
        this.$router.push('addplaces')
     
    },
    goList: function () {
     
        this.$router.push('products')
     
    },
    goListNews: function () {
     
        this.$router.push('news')
     
    }, yourCallBackFunction () {
     console.log('asdasd')
    }
  },
  created(){
       document.addEventListener("backbutton", this.yourCallBackFunction, false);
  }
}
</script>

<style scoped>
#logo {
  width: 180px;
  padding-top: 7px;
}
</style>