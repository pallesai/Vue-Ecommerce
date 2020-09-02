<template>
    <div class="products-list">
        <NavBar/>
        <div class="container mt-5">
            <div class="row w-100 h-60">
                <div class="col-md-7 mt-5">
                    <h3>Explore our products</h3>
                    <p class="text-secondary">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab at dolor doloribus, dolorum eveniet facilis harum impedit labore magnam minima neque, obcaecati perferendis possimus, quas quidem rerum saepe temporibus vel?</p>
                </div>
                <div class="col-md-5">
                    <div class="graphic">
                        <img class="banner-img img-fluid" src="/img/svg/productlist.svg" alt="logo">
                    </div>
                </div>
            </div>
        </div>
        <div class="h-100">
            <ProductsSlider value="Our products" size="10"/>
        </div>
        <Footer/>
        <Login/>
    </div>
</template>

<script>
    import NavBar from "../components/NavBar";
    import ProductsSlider from "../sections/ProductsSlider";
    import Login from "../components/Login";
    import Footer from "../components/Footer";

    export default {
        name: "ProductsList",
        components: {
            Footer,
            NavBar,
            ProductsSlider,
            Login,
        }
    }
</script>

<style scoped>

</style>