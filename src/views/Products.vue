<template>
  <div>
      <ul class="listOfProducts">
          <li v-for="(product, index) in products" :key="index" class="product">
              <img :src="product.images[0]" alt="" height="200" width="250">
              <router-link to="/product-details">
                  <h2 class="product-name" @click="addCurrentProduct(product)"> {{ product.name }}</h2>
              </router-link>
              <div class="product-price">
                  <span>Rs {{ product.price }}, 00</span>
              </div>
              <b-button variant="success" :cartIcon="true" @click="addProductToCart(product)">Add to cart</b-button>
          </li>
      </ul>
  </div>

</template>

<script>
import firebase from '../firebase';
import { db } from '../firebase';
import $ from 'jquery';

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
    firestore () {
          return {
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
        addProductToCart(product) {
            console.log("Printing produce ", product);
            $('#cartModal').modal('show');
            this.$store.dispatch('addProduct', product);
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

    .img-wrapp span.delete-img{
        position: absolute;
        top: -14px;
        left: -2px;
    }
    .img-wrapp span.delete-img:hover{
        cursor: pointer;
    }

    .listOfProducts {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      display: flex;
      display: -webkit-box;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 0;
    }
    .product {
      width: 300px;
      background-color: #fff;
      list-style: none;
      box-sizing: border-box;
      padding: 1em;
      margin: 1em 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-radius: 7px;
    }
    .product-name {
      font-size: 1.2em;
      font-weight: normal;
    }
    .product-name:hover {
      cursor: pointer;
      text-decoration: underline;
    }
    .product-price {
      width: 100%;
      text-align: center;
      justify-content: space-between;
      margin-bottom: .5em;
    }
</style>
