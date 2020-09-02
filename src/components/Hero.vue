
<template>
    <div class="hero">
        <div class="container h-100">
          <div class="row h-100 justify-content-center align-items-center">
            <div class="col-md-5">
              <div class="hero-content">
                <h1 class="hero-title">
                  Vue Shop For Developers
                </h1>
                <p class="text-secondary">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos numquam tempora, iure delectus totam minus quam aperiam ratione dolores magni voluptates ut necessitatibus odio ipsum fuga, voluptas ab praesentium nihil?
                </p>
                <div class="hero-btn mt-5">
                    <router-link class="btn custom-btn btn-info mr-4" :to="{ name: 'ProductsList'}">Explore</router-link>
                    <router-link class="btn custom-btn btn-outline-secondary" :to="{ name: 'About'}">About us</router-link>
                </div>
              </div>
            </div>
            <div class="col-md-6">
                <div class="graphic">
                    <img class="banner-img" src="/img/svg/main.svg" alt="logo">
                </div>
    
            </div>
          </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Hero',
  
}
</script>


<style scoped lang="scss">
  .hero{
    padding-top: 7rem;
    width: 100%;
    height: 500px;
    text-align: left;
  }

  .graphic {
    top: 10px;
  }

  .banner-img {
    margin: 10px;
    width: 100%;
  }
</style>