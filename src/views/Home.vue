<template>
    <div class="home">
        <NavBar/>
        <Hero/>
        <ProductsSlider/>
        <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import Hero from '@/components/Hero';
import ProductsSlider from '@/sections/ProductsSlider';
import Footer from "../components/Footer";


export default {
  name: 'Home',
  components: {
      Footer,
    NavBar,
    Hero,
      ProductsSlider,
  }
}
</script>
