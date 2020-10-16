<template>
  <div class="checkout">
    <NavBar/>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-6">
          <h4>
            Checkout page
          </h4>
          <h5 class="mb-4 text-secondary">Total price: Rs {{totalPrice}}</h5>

          <div v-if="getCart.length == 0">Your shopping cart is empty!</div>
          <div class="card mt-2 customCard" style="width: 40vw;" v-for="product in getCart" :key="product.id">
            <div class="card-body">
              <button type="button" class="close" aria-label="Close" @click="deleteProduct(product)">
                <span aria-hidden="true">&times;</span>
              </button>
              <div class="row">
                <div class="col-md-3">
                  <img :src="product.images[0]" alt="" width="100px" @click="showDetails(product)">
                </div>
                <div class="col-md-9">
                  <h5 class="card-title" @click="showDetails(product)" style="cursor: pointer">{{product.name}}</h5>
                  <h6 class="card-subtitle mb-2 text-muted">Rs {{product.price}}</h6>
                  <p class="card-text">
                    Quantity: <span style="cursor: pointer" class="add-item" @click="decreaseProduct(product)">-</span> {{product.quantity}} <span style="cursor: pointer;" class="add-item" @click="addProduct(product)">+</span>
                  </p>
                  <span class="badge badge-pill badge-primary ml-1"
                        v-for="(tag,index) in product.tags"
                        :key="index">
                    <span>{{tag}}</span>
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
        <div class="col-md-6 mt-5">
          <img src="/img/svg/savings.svg" alt="product" class="img-fluid">
        </div>
      </div>
      <hr class="col-xs-12 mt-3">
      <div class="row mt-2" v-if="getCart.length">
        <h6 class="text-secondary" v-if="!user">
          To continue shopping, you must be
          <a class="text-primary" style="cursor: pointer" data-toggle="modal" data-target="#login">logged in.</a>
        </h6>
        <div v-if="user" class="w-100">
          <h4>Delivery info</h4>
          <p class="text-secondary">Check your delivery info or submit them.</p>

          <form @submit="updateProfile">
            <div class="form-row">
              <div class="col-md-4 mb-3">
                <label for="validationDefault01">Full name</label>
                <input type="text" class="form-control" v-model="profile.name" id="validationDefault01" value="Mark" required>
              </div>
              <div class="col-md-4 mb-3">
                <label for="validationDefaultUsername">Phone</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupPrepend2">+48</span>
                  </div>
                  <input type="text" class="form-control" id="validationDefaultUsername" v-model="profile.phone" aria-describedby="inputGroupPrepend2" required>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-md-5 mb-3">
                <label for="validationDefault03">Address</label>
                <input type="text" class="form-control" v-model="profile.address" id="validationDefault03" required>
              </div>

              <div class="col-md-3 mb-3">
                <label for="validationDefault05">Zip</label>
                <input type="text" class="form-control" v-model="profile.postcode" id="validationDefault05" required>
              </div>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="agree" id="invalidCheck2" required>
                <label class="form-check-label" for="invalidCheck2">
                  Agree to terms and conditions
                </label>
              </div>
            </div>
            <hr class="col-xs-12 mt-2">
            <h6 class="text-info mt-3">Total price: ${{ totalPrice }}</h6>
            <p class="text-secondary">
              Make sure, your address is fine.
            </p>
            <input class="btn btn-primary" type="submit" value="Go to payment">
            <router-link class="btn btn-outline-info ml-2" :to="{name: 'ProductsList'}">Continue shopping</router-link>
            <hr class="col-xs-12 mt-5">
          </form>
        </div>

      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
  import NavBar from "../components/NavBar";
  import { mapGetters, mapActions } from 'vuex';
  import firebase, {db} from "../firebase";
  import $ from "jquery";
  import Footer from "../components/Footer";


export default {
  name: 'Checkout',
  data () {
    return {
      user: null,
      loading: null,
      agree: null,
    }
  },
  firestore () {
    const user = firebase.auth().currentUser;
    return {
      profile: db.collection('profiles').doc(user.uid)
    }
  },
  components: {
    Footer,
    NavBar
  },
  methods: {
    ...mapActions([
      'deleteProduct',
      'addProduct',
      'decreaseProduct',
    ]),

    showDetails (product) {
      this.$store.dispatch('setActiveProduct', product);
      $('#productModal').modal('show');
    },

    updateProfile () {
      this.loading = true;

      this.$firestore.profile.update(this.profile)
              .then(() => {
                this.loading = false;
                window.Toast.fire({
                  icon: 'success',
                  title: 'Your delivery address was saved!'
                });
                this.$router.push({ name: 'Payment'});
              })
              .catch((err) => console.log(err));
    },
  },
  computed: {
    ...mapGetters([
      'getCart',
      'totalPrice',
    ]),
  },
  created() {
    this.user = firebase.auth().currentUser;
  },
}
</script>

<style scoped>
  .customCard {
    transition: transform .2s ease;
    max-width: 450px;
  }

  .customCard:hover {
    transform: scale(1.03);
  }



</style>
