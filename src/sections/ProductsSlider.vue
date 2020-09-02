<template>
    <div class="products" id="products">
        <div class="container">
            <ProductCardModal/>
            <h1 class="text-center p-5">{{value}}</h1>
            <div class="row">

                <div class="col-md-4" v-for="product in getProducts" :key="product.id">
                    <div class="card product-item">

                        <carousel :perPage="1">
                            <slide v-for="(image, index) in product.images" :key="index">
                                <img :src="image" class="card-img-top p-1 img-logo" alt="...">
                            </slide>
                        </carousel>

                        <div class="card-body">
                            <div class="d-flex justify-content-between">
                                <h5 class="card-title" style="cursor:pointer;" @click="showDetails(product)">{{ product.name }}</h5>
                                <h5 class="card-priceS">$ {{ product.price }}</h5>

                            </div>
                            <span class="badge badge-primary ml-1"
                                  v-for="(tag,index) in product.tags"
                                  :key="index"
                                  @click="showDetails(product)"
                            style="cursor: pointer;">
                                    {{tag}}
                            </span>
                            <AddToCart :ProductId="product.id" value="Add to cart" />
                        </div>
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
    import { Carousel, Slide } from 'vue-carousel';
    import { db } from '../firebase';
    import ProductCardModal from "../components/ProductCardModal";
    import AddToCart from "../components/AddToCart";
    import $ from "jquery";

export default {
    name: "ProductsSlider",
    props: {
        value: {
            type: String,
            default: 'Explore our products',
        },
        size: {
            default: 3
        }
    },
    components: {
        AddToCart,
        Carousel,
        Slide,
        ProductCardModal,
    },
    firestore(){
        return {
            products: db.collection('products'),
        }
    },
    methods: {
        showDetails (product) {
            this.$store.dispatch('setActiveProduct', product);
            $('#productModal').modal('show');
        },
    },
    created() {
        console.log(this.products)
    },
    computed: {
        getProducts() {
            if(this.size > 0 && this.size < this.products.length){
                return this.products.slice(0,this.size);
            }
            return this.products;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    .products{
        margin-top: 7rem;
        background: #f2f2f2;
        padding-bottom: 3rem;
    }

</style>