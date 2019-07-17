import Vue from 'vue'
import Router from 'vue-router'
import Board from '@/components/Board'
import HelloWorld from '@/components/HelloWorld'
import Weather from '@/components/Weather'
import Home from '@/components/Home'
import GoogleMap from '@/components/GoogleMap'
import AddPlaces from '@/components/AddPlaces'
import Login from '@/components/Login'
import SignUp from "@/components/SignUp";
import Products from "@/components/Products"
import firebase from 'firebase';
import AddProduct from '@/components/AddProduct'
import News from '@/components/News'
import AddNews from '@/components/AddNews'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: '/login'
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/weather',
      name: 'Weather',
      component: Weather,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/map',
      name: 'GoogleMap',
      component: GoogleMap,
      meta: {
        requireAuth: true
      }
      
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/board',
      name: 'Board',
      component: Board,
      meta: {
        requireAuth: true
      }
    },{
      path: '/addplaces',
      name: 'Add',
      component: AddPlaces,
      meta: {
        requireAuth: true
      }
      
    },
    {
      path: '/products',
      name: 'Products',
      component: Products,
      meta: {
        requireAuth: true
      }
      
    }, 
    {
      path: '/addproduct',
      name: 'AddProduct',
      component: AddProduct,
      meta: {
        requireAuth: true
      }
    }
    ,
    {
      path: '/news',
      name: 'News',
      component: News,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/addnews',
      name: 'AddNews',
      component: AddNews,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requireAuth = to.matched.some(record => record.meta.requireAuth);

  if(requireAuth && !currentUser) next('login')
  else if(!requireAuth && currentUser) next('board')
  else next()
})

export default router