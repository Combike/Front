// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

// Vue.use(VueGoogleMaps, {
//   load: {
//     key: 'AIzaSyAScck9X91OxwM0wMi6kZ7t2Ni_OWupmc8',
//     libraries: 'places', // This is required if you use the Autocomplete plugin
//     // OR: libraries: 'places,drawing'
//     // OR: libraries: 'places,drawing,visualization'
//     // (as you require)
//   }
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
