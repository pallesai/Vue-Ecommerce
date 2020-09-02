<template>
    <div class="overview">
        <NavBar/>
        <Loading v-if="loading"/>
        <div class="container h-100 mt-5">
            <div class="intro h-100">
                <div class="row h-100 justify-content-center align-items-center">
                    <div class="col-md-6">
                        <h3>Payment Page</h3>
                        <p class="text-info">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo explicabo numquam impedit provident error veniam quam quae placeat, dignissimos, amet maiores vitae facilis possimus, ullam blanditiis cum quisquam at sed?
                        </p>
                        <h6 class="text-info">Total price: ${{totalPrice}}</h6>
                    </div>
                    <div class="col-md-6">
                        <img src="/img/svg/wallet.svg" alt="product" class="img-fluid">
                    </div>
                </div>
            </div>

            <hr class="col-xs-12 mt-4">

            <div class="row h-100 mt-3">
                <p class="text-secondary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut blanditiis dicta in minus numquam. Distinctio doloremque dolores dolorum ipsam, laborum laudantium nemo nisi, provident quae qui recusandae repudiandae tempora vitae!</p>

                <div class="col-md-4 mt-2">
                    <button class="btn btn-outline-info" v-if="cart.length" @click="addOrder">Order and pay</button>
                    <router-link :to="{ name: 'Checkout' }" class="btn btn-outline-danger ml-2">Back to checkout</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from "../components/NavBar";
import { mapGetters, mapActions } from 'vuex';
import firebase, { db } from '../firebase';
import Loading from "../components/Loading";

export default {
    name: 'Overview',
    components: {Loading, NavBar},
    data () {
        return {
            loading: null,
        }
    },
    computed: {
        ...mapGetters({
            totalPrice: 'totalPrice',
            cart: 'getCart',
        })
    },
    firestore () {
        const user = firebase.auth().currentUser;
        return {
            orders: db.collection('orders'),
            profile: db.collection('profiles').doc(user.uid)
        }
    },
    methods: {
        ...mapActions([
            'setCartEmpty',
        ]),

        addOrder () {
            let order = {
                user: this.profile,
                order: this.cart,
                status: 'pending',
            };
            console.log(order);
            this.loading = true;
            this.$firestore.orders.add(order)
            .then(() => {
                this.loading = false;
                this.$router.push({ name: 'MyOrders' });

                window.Toast.fire({
                    icon: 'success',
                    title: 'Your order has been accepted!'
                });

            }).catch(err => {
                console.error(err);
                window.Toast.fire({
                    icon: 'error',
                    title: 'Your order has been rejected!'
                });
            });
            this.$store.dispatch('setCartEmpty');
        }
    }

}
</script>

<style scoped>

</style>
