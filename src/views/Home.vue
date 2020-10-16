<template>
    <div class="home">
        <NavBar/>
        <Products/>
        <Footer/>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import Products from "@/views/Products";
import Footer from "@/components/Footer";


export default {
  name: 'Home',
  components: {
      Footer,
      NavBar,
      Products
  }
}
</script>
