<template>
    <div class="overview">
        <div class="container h-100">
            <Loading v-if="loading"/>
            <div class="intro h-100">
                <div class="row h-100 justify-content-center align-items-center">
                    <div class="col-md-6">
                        <h3>My orders</h3>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo explicabo numquam impedit provident error veniam quam quae placeat, dignissimos, amet maiores vitae facilis possimus, ullam blanditiis cum quisquam at sed?
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img src="/img/svg/orders.svg" alt="product" class="img-fluid">
                    </div>
                </div>
            </div>
            <hr class="col-xs-12 mt-5">

            <table class="table table-hover table-dark mt-5">
                <thead>
                <tr>
                    <th scope="col">Full name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Post code</th>
                    <th scope="col">Total price</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="order in myOrders" :key="order.id" @click="openOrder(order)" style="cursor: pointer">
                    <th scope="row">{{order.user.name}}</th>
                    <td>{{order.user.address}}</td>
                    <td>{{order.user.postcode}}</td>
                    <td>${{totalPrice(order)}}</td>
                    <td>
                        <span v-if="order.status === 'pending'" class="badge badge-pill badge-primary">{{order.status}}</span>
                        <span v-if="order.status === 'delivered'" class="badge badge-pill badge-success">{{order.status}}</span>
                        <span v-if="order.status === 'in-delivery'" class="badge badge-pill badge-info">{{order.status}}</span>
                    </td>
                </tr>
                </tbody>
            </table>

            <div class="modal fade" id="myOrderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h6 class="modal-title" id="exampleModalLabel">Order details</h6>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <ProductCard :products="activeOrder.order" />
                            <hr class="col-xs-12 mt-3">
                            <h6 class="text-bold">{{activeOrder.user.name}}</h6> <span>Phone: +48 {{activeOrder.user.phone}}</span>
                            <p><span class="text-info">{{activeOrder.user.address}}</span>, <span class="text-secondary">{{activeOrder.user.postcode}}</span></p>

                            <h5 class="text-info">Total price: ${{totalActiveOrderPrice}}</h5>
                            <h6 class="text-secondary">Order status: <span class="badge badge-pill badge-info">{{activeOrder.status}}</span></h6>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import firebase, { db } from '../firebase';
    import Loading from "../components/Loading";
    import ProductCard from "../components/ProductCard";
    import $ from "jquery";

    export default {
      name: 'Overview',
        components: {
            Loading,
            ProductCard},
        data () {
          return {
              loading: false,
              activeOrder: {
                  status: null,
                  order: [{
                      description: null,
                      id: null,
                      images: null,
                      name: null,
                      tags: null,
                  }],
                  user: {
                      address: null,
                      id: null,
                      name: null,
                      phone: null,
                      postcode: null
                  }
              }
          }
        },
        firestore () {
            const user = firebase.auth().currentUser;
            return {
                myOrders: db.collection('orders').where("user.id","==",user.uid),
            }
        },
        methods: {
            totalPrice (order) {
                if (order.order.length === 1){
                    return order.order[0].price * order.order[0].quantity
                }
                return order.order.reduce((a,b) => {
                    return a.price * a.quantity + b.price * b.quantity;
                });
            },

            openOrder (order) {
                this.activeOrder = order;
                console.log(this.activeOrder);
                $("#myOrderModal").modal('show');
            },
        },
        computed: {
            totalActiveOrderPrice () {
                if (this.activeOrder.order.length === 1){
                    return this.activeOrder.order[0].price * this.activeOrder.order[0].quantity
                }
                return this.activeOrder.order.reduce((a,b) => {
                    return a.price * a.quantity + b.price * b.quantity;
                });
            },
        }
    }
</script>

<style scoped>

</style>
