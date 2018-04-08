import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import AddRoute from '@/components/AddRoute'
import Routes from '@/components/Routes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/add-route',
      name: 'AddRoute',
      component: AddRoute
    },
    {
      path: '/routes',
      name: 'Routes',
      component: Routes
    }
  ]
})
