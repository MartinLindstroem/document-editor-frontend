<template>
  <div id="app">
    <!-- <Toolbar /> -->
    <TextEditor />
  </div>
</template>

<script>
import TextEditor from "./components/TextEditor.vue";
// import Toolbar from "./components/Toolbar.vue";

export default {
  name: "App",
  components: {
    TextEditor,
    // Toolbar,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
