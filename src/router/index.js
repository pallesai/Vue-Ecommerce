import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Products from '../views/Products.vue'
import Admin from '../views/Admin.vue'
import MyOrders from '../views/MyOrders.vue'
import Profile from "../views/Profile";
import Orders from "../views/Orders";
import Checkout from "../views/Checkout";

import firebase, {db} from '../firebase';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: 'admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'my-orders/',
        name: 'MyOrders',
        component: MyOrders
      },
      {
        path: 'products/',
        name: 'Products',
        component: Products,
        meta: {
          // requiresAuth: true,
          requiresStaff: true
        }
      },
      {
        path: 'profile/',
        name: 'Profile',
        component: Profile
      },
      {
        path: 'orders/',
        name: 'Orders',
        component: Orders,
        meta: {
          // requiresAuth: true,
          requiresStaff: true
        }
      }
    ]
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: Checkout,
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/products-list',
    name: 'ProductsList',
    component: () => import(/* webpackChunkName: "about" */ '../views/ProductsList.vue')
  },
  {
    path: '/payment',
    name: 'Payment',
    component: () => import(/* webpackChunkName: "about" */ '../views/Payment.vue'),
    meta: { requiresAuth: true },
  },

]

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const requiresStaff = to.matched.some(x => x.meta.requiresStaff);
  const currentUser = firebase.auth().currentUser;

  if (requiresStaff) {
    let docRef = db.collection('profiles').doc(currentUser.uid);
    docRef.get().then((doc) => {
      let isStaff = doc.data().isStaff;
      if (isStaff) {
        next();
      }
      else {
        next('/');
      }
    });
  }

  if (requiresAuth && !currentUser){
    next('/');
  } else if (requiresAuth && currentUser){
    next();
  } else {
    next();
  }
});


export default router
