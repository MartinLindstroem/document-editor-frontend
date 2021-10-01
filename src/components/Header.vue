<template>
  <nav class="navbar">
    <ul class="nav-content">
      <li><router-link class="nav-link" to="/">Home</router-link></li>
      <li><router-link class="nav-link" to="/editor">Editor</router-link></li>
      <li>
        <router-link class="nav-link" to="/login">Login</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data: function () {
    return {};
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
}
.nav-content li {
  display: inline;
  padding: 10px;
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
</style>