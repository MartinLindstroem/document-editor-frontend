<template>
  <nav class="navbar">
    <ul class="nav-content">
      <li><router-link class="nav-link" to="/">Home</router-link></li>
      <li><router-link class="nav-link" to="/editor">Editor</router-link></li>
      <li>
        <router-link class="nav-link" to="/login">Login</router-link>
      </li>
      <li class="userDisplay" v-if="this.user">{{ username }}</li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["username"],
  data: function () {
    return {
      user: null,
    };
  },
  mounted() {
    if (localStorage.getItem("user")) {
      this.user = localStorage.getItem("user");
    }
  },
};
</script>

<style>
.navbar {
  background-color: #2196f3;
  margin-bottom: 20px;
}
.nav-content {
  padding: 30px;
  /* display: flex; */
}
.nav-content li {
  display: inline;
  /* padding: 10px; */
  color: white;
  font-size: 20px;
}
.nav-content li a {
  color: white;
  text-decoration: none;
  padding: 10px;
  /* float: left; */
  /* float: right; */
}

.userDisplay {
  /* display: inline; */
  float: right;
}
</style>