<template>
    <div class="border-top border-dark">
        <div class="row p-5 h-100 justify-content-center align-items-center">
            <div class="col-md-8">
                <h3>Learn More About us</h3>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quaerat voluptate iusto? Nihil voluptas vitae veritatis magnam reprehenderit, reiciendis ex? Libero quasi natus veniam voluptatum, voluptas exercitationem ratione consectetur et!
                </p>
                <router-link :to="{ name: 'ProductsList' }" class="btn btn-sm custom-btn btn-outline-info mr-2">Browse Products</router-link>
                <router-link :to="{ name: 'About' }" class="btn custom-btn btn-sm btn-outline-primary mr-4">About us!</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
.container-test {
  border: 3px solid red;
}
</style>
