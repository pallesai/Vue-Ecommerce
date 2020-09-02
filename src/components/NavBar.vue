<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link class="navbar-brand" :to="{ name: 'Home' }">Vue Shop</router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{name: 'Home'}" class="nav-link" href="#">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'ProductsList'}" class="nav-link" href="#">Products</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'About'}" class="nav-link" href="#">About</router-link>
          </li>

        </ul>

        <ul class="navbar-nav mr-2">
          <li class="nav-item dropdown" v-if="user">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Profile</a>
            <div class="dropdown-menu">
              <router-link class="dropdown-item" :to="{ name: 'Profile' }">Account</router-link>
              <router-link class="dropdown-item" :to="{ name: 'MyOrders' }">My orders</router-link>
              <router-link class="dropdown-item" :to="{ name: 'Checkout' }">Checkout</router-link>
              <div class="dropdown-divider"></div>
              <a @click="logout" class="dropdown-item" style="cursor: pointer;">Logout</a>
            </div>
          </li>
          <li v-if="!user" class="nav-item">
            <a class="nav-link" style="cursor: pointer;" data-toggle="modal" data-target="#login">Login</a>
          </li>
          <li class="nav-item mr-5">
            <div class="container"><Cart /></div>
          </li>
        </ul>
      </div>
    </nav>
    <Login/>
    <CartButton/>
  </div>
</template>

<script>


import firebase from "../firebase";
import Cart from "./Cart";
import CartButton from "./CartButton";
import Login from "./Login";

export default {
  name: 'NavBar',
  components: {
    Cart,
    CartButton,
    Login,
  },
  data () {
    return {
      user: null,
    }
  },
  created() {
    this.user = firebase.auth().currentUser;
  },
  methods: {
    logout () {
      firebase.auth().signOut()
              .then(() => {
                this.$router.push({ name: 'Home' });
              })
              .catch(error => console.log(error));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
