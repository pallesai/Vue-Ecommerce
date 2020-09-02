<template>
  <div class="about">
    <NavBar/>
    <div class="container h-100">
      <div class="intro h-100">
        <div class="row h-100 justify-content-center align-items-center">
          <div class="col-md-6">
            <img src="/img/svg/team.svg" alt="product" class="img-fluid">
          </div>
          <div class="col-md-6">
            <h3>About Page</h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo explicabo numquam impedit provident error veniam quam quae placeat, dignissimos, amet maiores vitae facilis possimus, ullam blanditiis cum quisquam at sed?
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import NavBar from "../components/NavBar";
  export default {
    components: {NavBar}
  }
</script>