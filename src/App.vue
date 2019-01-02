<template>
  <v-app>
    <v-toolbar app dark >
      
      
      <v-spacer></v-spacer>
      
      
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn href="/#/board" small ma0 flat>
          <span>Rating</span>
        </v-btn>
        <v-btn href="/#/map" small ma0 flat>
          <span>Tracker</span>
        </v-btn>
        
        <v-icon style="margin-left:20px" href="wave-light" v-on:click="logout">exit_to_app</v-icon>
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
    }
  }
}
</script>

<style scoped>
#logo {
  width: 180px;
  padding-top: 7px;
}
</style>