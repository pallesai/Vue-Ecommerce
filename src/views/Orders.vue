<template>
    <div class="overview">
        <div class="container h-100">
            <Loading v-if="loading"/>
            <div class="intro h-100">
                <div class="row h-100 justify-content-center align-items-center">
                    <div class="col-md-6">
                        <h3>Orders Page</h3>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo explicabo numquam impedit provident error veniam quam quae placeat, dignissimos, amet maiores vitae facilis possimus, ullam blanditiis cum quisquam at sed?
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img src="/img/svg/delivery.svg" alt="product" class="img-fluid">
                    </div>
                </div>
            </div>

            <div class="row h-100 justify-content-center align-items-center mt-3">
                <div class="col-md-4">
                    <div class="card text-white bg-info mb-1 info-card">
                        <div class="card-header">
                            <h4 class="card-title">Total orders</h4>
                        </div>
                        <div class="card-body" style="text-align: center">
                            <h2 class="font-weight-bold">{{orders.length}}</h2>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card bg-light mb-1 info-card">
                        <div class="card-header">
                            <h4 class="card-title">Orders pending</h4>
                        </div>
                        <div class="card-body" style="text-align: center">
                            <h2 class="font-weight-bold">{{ordersPending.length}}</h2>
                        </div>
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="card text-white bg-success mb-1 info-card">
                        <div class="card-header">
                            <h4 class="card-title">Orders delivered</h4>
                        </div>
                        <div class="card-body" style="text-align: center">
                            <h2 class="font-weight-bold">{{ordersDelivered.length}}</h2>
                        </div>
                    </div>
                </div>

                <table class="table table-hover table-dark mt-5">
                    <thead>
                    <tr>
                        <th scope="col">Full name</th>
                        <th scope="col">Address</th>
                        <th scope="col">Post code</th>
                        <th scope="col">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="order in orders" :key="order.id" @click="openOrder(order)" style="cursor: pointer">
                            <th scope="row">{{order.user.name}}</th>
                            <td>{{order.user.address}}</td>
                            <td>{{order.user.postcode}}</td>
                            <td>
                                <span v-if="order.status === 'pending'" class="badge badge-pill badge-primary">{{order.status}}</span>
                                <span v-if="order.status === 'delivered'" class="badge badge-pill badge-success">{{order.status}}</span>
                                <span v-if="order.status === 'in-delivery'" class="badge badge-pill badge-info">{{order.status}}</span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

                <!--`           Order modal -->
            <div class="modal fade" id="orderModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

                            <hr class="col-xs-12 mt-3">
                            <h6 class="text-info mt-5">Total price: ${{totalPrice}}</h6>
                            <h6>Change status</h6>
                            <div class="form-group row">

                                <div class="col-md-6">
                                    <input type="radio" id="one" value="delivered" v-model="status" class="mr-2">
                                    <label for="one">delivered</label>
                                    <br>
                                    <input type="radio" id="two" value="in-delivery" v-model="status" class="mr-2">
                                    <label for="two">in-delivery</label>
                                    <br>
                                    <input type="radio" id="two" value="pending" v-model="status" class="mr-2">
                                    <label for="two">pending</label>
                                    <br>
                                </div>
                            </div>

                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-warning" @click="deleteOrder(activeOrder)">Delete order</button>
                            <button type="button" class="btn btn-info" @click="updateOrder">Save changes</button>
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
    import $ from "jquery";
    import ProductCard from "../components/ProductCard";

    export default {
        name: 'Orders',
        components: {ProductCard, Loading},
        data () {
            return {
                loading: null,
                status: null,
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
                profile: db.collection('profiles').doc(user.uid),
                orders: db.collection('orders'),
            }
        },
        methods: {
            deleteOrder (doc) {
                window.Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.value) {
                        // this.loading = true;
                        this.$firestore.orders.doc(doc.id).delete()
                            .then(() => {
                                // this.loading = false;
                            });

                        window.Toast.fire({
                            icon: 'success',
                            title: 'Order was deleted successfully!'
                        })
                        $("#orderModal").modal('hide');
                    }
                })
            },

            openOrder (order) {
                this.activeOrder = order;
                this.status = order.status;
                $("#orderModal").modal('show');
            },

            updateOrder () {

                this.loading = true;
                this.$firestore.orders.doc(this.activeOrder.id).update({
                    status: this.status
                })
                    .then(() => {
                        this.loading = false;

                        window.Toast.fire({
                            icon: 'success',
                            title: 'Order status was updated successfully!'
                        });

                    })
                    .catch((err) => {

                        window.Toast.fire({
                            icon: 'error',
                            title: 'Error!'
                        });

                        console.error(err);
                    });

                $("#orderModal").modal('hide');
                this.status = null;
            }
        },
        computed: {
            totalPrice () {
                if (this.activeOrder.order.length === 1){
                    return this.activeOrder.order[0].price * this.activeOrder.order[0].quantity
                }
                return this.activeOrder.order.reduce((a,b) => {
                    return a.price * a.quantity + b.price * b.quantity;
                });
            },

            ordersPending () {
                return this.orders.filter(order => order.status === 'pending');
            },

            ordersDelivered () {
                return this.orders.filter(order => order.status === 'delivered');
            }
        },
    }
</script>

<style scoped>
    .info-card {
        transition: transform .3s ease;
        max-width: 18rem;
        text-align: center
    }

    .info-card:hover {
        transform: scale(1.02);
    }
</style>
