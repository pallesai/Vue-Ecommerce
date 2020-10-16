require('dotenv').config({
    path: '../.env'
});
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import jQuery from 'jquery';
import VueFirestore from 'vue-firestore';
import 'popper.js';
import 'bootstrap';
import './assets/app.scss';
import firebase from './firebase';
import Swal from 'sweetalert2'
import VueCarousel from 'vue-carousel';
import BootstrapVue from "bootstrap-vue"

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

window.$ = window.jQuery = jQuery;
window.Swal = Swal;
Vue.use(VueCarousel);


import { store } from './store/store';

require('firebase/firestore');
Vue.use(VueFirestore,{
    key: 'id',
    enumerable: true,
});

Vue.use(BootstrapVue);

Vue.config.productionTip = false;
let app = '';

firebase.auth().onAuthStateChanged(function(user){
    if (!app){
    new Vue({
        router,
        store,
        render: h => h(App)
        }).$mount('#app')
    }
    console.log(user);
});

const Toast = window.Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', window.Swal.stopTimer)
        toast.addEventListener('mouseleave', window.Swal.resumeTimer)
    }
});

window.Toast = Toast;
