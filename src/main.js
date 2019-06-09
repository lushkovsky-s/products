// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import {observable, isObservable, toJS} from 'mobx'
import VueMobx from 'vue-mobx'

Vue.config.productionTip = false

Vue.use(VueMobx, {
  toJS: toJS,
  isObservable: isObservable,
  observable: observable
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
