// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

require('jquery/dist/jquery.min')
//require('../node_modules/bulma/css/bulma.min.css')
//require('../node_modules/materialize-css/dist/css/materialize.min.css')
//require('materialize-css/dist/js/materialize.min')
import Vue from 'vue'
import '@fortawesome/fontawesome-free/css/all.css'
import './plugins/vuetify'
import App from './App'
import router from './router'
import VueFire from 'vuefire';
import './plugins/vuetify'
import './firebase';
import Vuetify from 'vuetify'
import * as VueGoogleMaps from "vue2-google-maps";
import DatetimePicker from 'vuetify-datetime-picker'
import 'vuetify-datetime-picker/src/stylus/main.styl'
//import BootstrapVue from 'bootstrap-vue'

//Vue.use(BootstrapVue);
Vue.use(DatetimePicker)
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDrmVriOLevsxfYMfpoyl221ZpUp4YZiNQ",
    libraries: "places" // necessary for places input
  }
});
Vue.use(VueFire);
Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'fa'
 })

import firebase from 'firebase'
let app;
/*
let config = {
  apiKey: "AIzaSyCPOSwMdKirDt3Dw0prP4tv7S5vk12xpRg",
  authDomain: "projectfi-635a2.firebaseapp.com",
  databaseURL: "https://projectfi-635a2.firebaseio.com",
  projectId: "projectfi-635a2",
  storageBucket: "projectfi-635a2.appspot.com",
  messagingSenderId: "913713500929"
};
//firebase.initializeApp(config);
const firebaseapp=firebase.initializeApp(config);*/
firebase.auth().onAuthStateChanged(() => {
  if (!app){
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
/* eslint-disable no-new */

