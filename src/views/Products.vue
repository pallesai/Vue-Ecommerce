<template>
    <div class="products">
        <Loading v-if="loading" />
        <div class="container h-100">
            <div class="intro h-100">
                <div class="row h-40 justify-content-center align-items-center">
                    <div class="col-md-6">
                        <h3>Product Page</h3>
                        <p>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo explicabo numquam impedit provident error veniam quam quae placeat, dignissimos, amet maiores vitae facilis possimus, ullam blanditiis cum quisquam at sed?
                        </p>
                    </div>
                    <div class="col-md-6">
                        <img src="/img/svg/analyze.svg" alt="product" class="img-fluid">
                    </div>
                </div>
                <div class="row h-100 justify-content-center align-tems-center">

                    <div class="col-md-6">
                        <div class="card text-white bg-success mb-1 info-card">
                            <div class="card-header">
                                <h4 class="card-title">Total products</h4>
                            </div>
                            <div class="card-body" style="text-align: center">
                                <h2 class="font-weight-bold">{{products.length}}</h2>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6">
                        <div class="card text-white bg-info mb-1 info-card">
                            <div class="card-header">
                                <h4 class="card-title">Sold products</h4>
                            </div>
                            <div class="card-body" style="text-align: center">
                                <h2 class="font-weight-bold">{{soldProducts}}</h2>
                            </div>
                        </div>
                    </div>


                    <div class="table-responsive">
                        <button @click="addNew" class="btn btn-sm btn-info float-right mt-2">+ Add product</button>
                        <table class="table table-hover table-dark mt-5">

                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Modify</th>
                                </tr>
                            </thead>
                            <tbody>
                            <tr v-for="prod in products" :key="prod.id">
                                <th scope="row" @click="editProduct(prod)" style="cursor:pointer;">{{prod.name}}</th>
                                <td>${{prod.price}}</td>
                                <td>
                                    <i @click="editProduct(prod)" class="fas fa-edit" style="cursor: pointer"></i>
                                    <i @click="deleteProduct(prod)" class="fas fa-trash ml-2" style="cursor: pointer"></i>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            <!--     Add new product modal       -->
            <div class="modal fade bd-example-modal-xl" id="product" tabindex="-1" role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editModalLabel">Add new product</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <div class="row w-100">
                                <div class="col-md-7">
                                    <label for="name">Product name</label>
                                    <input type="text" v-model="product.name" class="form-control" id="name" placeholder="Product name">
                                    <div class="form-group">
                                        <label for="name">Description</label>
                                        <vue-editor v-model="product.description"></vue-editor>
                                    </div>
                                </div>
                                <div class="col-md-5">
                                    <h5>Product Details</h5>
                                    <hr>
                                    <label for="price">Price</label>
                                    <input type="text" v-model="product.price" class="form-control" id="price" placeholder="Price">

                                    <div class="form-group">
                                        <label for="tags">Product tags</label>
                                        <input type="text" v-model="tag" @keyup.188="addTag" class="form-control" id="tags" placeholder="Tags">
                                        <span class="badge badge-pill badge-primary ml-1"
                                              v-for="(tag,index) in product.tags"
                                              :key="index">
                                            <span @dblclick="deleteTag(index)" style="cursor: pointer">{{tag}}</span>
                                        </span>
                                    </div>
<!--                                    <div class="form-group">-->
<!--                                        <label for="product_image">Product Image</label>-->
<!--                                        <input type="file" @change="uploadImage" class="form-control"-->
<!--                                               name="product_image" accept="image/x-png,image/gif,image/jpeg">-->
<!--                                    </div>-->
                                    <div class="input-group">
                                        <div class="custom-file">
                                            <input @change="uploadImage" type="file" class="custom-file-input" id="inputGroupFile01"
                                                   aria-describedby="inputGroupFileAddon01">
                                            <label class="custom-file-label" for="inputGroupFile01">Product Image</label>
                                        </div>
                                    </div>
                                    <div class="form-group d-flex mt-3">
                                        <div class="p-1" v-for="(image, index) in product.images" :key="index">
                                            <div class="img-wrapp">
                                                <img :src="image" alt="" width="80px">
                                                <span class="delete-img" @click="deleteImage(image,index)">
                                                    <i class="fas fa-times"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" @click="addProduct" class="btn btn-primary" v-if="modal === 'new'">Add</button>
                            <button type="button" @click="updateProduct" class="btn btn-primary" v-if="modal === 'edit'">Save</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import firebase from '../firebase';
import { db } from '../firebase';
import $ from 'jquery';
import { VueEditor } from "vue2-editor";
import Loading from "@/components/Loading";

export default {
  name: 'Products',
  data () {
      return {
          product : {
              name: null,
              description: null,
              price: null,
              tags: [],
              images: []
          },
          loading: false,
          modal: null,
          tag: null,
      }
  },
    components: {
        VueEditor,
        Loading,
    },
    firestore () {
        const user = firebase.auth().currentUser;

          return {
              profile: db.collection('profiles').doc(user.uid),
              products: db.collection('products'),
              orders: db.collection('orders'),
          }
    },

    methods: {
        addNew () {
            this.reset();
            this.modal = 'new';
            $("#product").modal('show');
        },

        addProduct () {
            this.loading = true;
            this.$firestore.products.add(this.product)
            .then(()=>{
                this.loading = false;
                this.reset();
                this.modal = null;
            })
            .catch((err) => {
                console.error(err);
            });
            $("#product").modal('hide');
            window.Toast.fire({
                icon: 'success',
                title: 'Product was added successfully!'
            });
        },

        deleteProduct (doc) {
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
                    this.$firestore.products.doc(doc.id).delete()
                        .then(() => {
                            // this.loading = false;
                        });

                    window.Toast.fire({
                        icon: 'success',
                        title: 'Product was deleted successfully!'
                    })
                }
            })

        },

        editProduct (product) {
            this.modal = 'edit';
            this.product = product;
            $("#product").modal('show');
        },

        updateProduct () {
            this.loading = true;
            this.$firestore.products.doc(this.product.id).update(this.product)
                .then(() => {
                    this.loading = false;
                    this.reset();
                    this.modal = null;
                })
                .catch((err) => {
                    console.error(err);
                });

            $("#product").modal('hide');
            window.Toast.fire({
                icon: 'success',
                title: 'Product was updated successfully!'
            });
        },

        addTag () {
            let tag = this.tag.slice(0,-1);
            this.product.tags.push(tag);
            this.tag = "";
        },

        deleteTag (index) {
            this.product.tags.splice(index,1);
        },

        uploadImage (event) {

            if(!event.target.files[0]){
                return;
            }

            let file = event.target.files[0];
            let storageRef = firebase.storage().ref('products/'+ Math.random() + '_'  + file.name);

            this.loading = true;
            let uploadTask = storageRef.put(file);

            uploadTask.on('state_changed', (snapshot) => {
                console.log(snapshot);
            }, (error) => {
                console.log(error);
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                    this.loading = false;
                    this.product.images.push(downloadURL);
                });
            });
        },

        deleteImage (img, index) {
            let image = firebase.storage().refFromURL(img);

            this.product.images.splice(index,1);
            image.delete().then(() => {
                console.log("img deleted");
            })
            .catch((err) => {
                console.log(err);
            })
        },

        reset () {
            this.product.name = null;
            this.product.description = null;
            this.product.price = null;
            this.tag = null;
            this.product.tags = [];
            this.product.images = [];
        }
  },
    computed: {
      soldProducts () {
          let sum = 0;
          this.orders.forEach(x => {
              x.order.forEach(product => {
                  sum += product.quantity;
              })
          });
          return sum;
      }
    }
  
}
</script>

<style scoped>

    .img-wrapp {
        position: relative;
    }
    .img-wrapp span.delete-img{
        position: absolute;
        top: -14px;
        left: -2px;
    }
    .img-wrapp span.delete-img:hover{
        cursor: pointer;
    }

    .info-card {
        transition: transform .3s ease;
        max-width: 25rem;
        text-align: center;
        margin-top: 2rem;
    }

    .info-card:hover {
        transform: scale(1.02);
    }
</style>
