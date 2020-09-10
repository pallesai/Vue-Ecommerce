<template>
  <div class="addToCart">
    <button class="btn btn-sm btn-info p-2 mt-2" @click="addToCart">{{ value }}</button>
  </div>
</template>

<script>
  import {db} from '../firebase';
  import $ from "jquery";

export default {
  name: 'AddToCart',
  data () {
    return {

    }
  },
  firestore () {
    return {
      product: db.collection('products').doc(this.ProductId)
    }
  },
  props: {
    value: {
      type: String,
      required: true
    },
    ProductId: {
      type: String,
      required: true
    }
  },

  methods: {
    addToCart() {
      $('#cartModal').modal('show');
      this.$store.dispatch('addProduct', this.product);
    },

  }
}
</script>

<style scoped>

</style>
