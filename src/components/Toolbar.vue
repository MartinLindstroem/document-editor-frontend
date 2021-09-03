<template>
  <div class="toolbar">
    <button class="btn" v-on:click="log">Save</button>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  props: ["editorContent"],
  methods: {
    log: function () {
      console.log(this.editorContent);
    },
  },
};
</script>

<style>
.toolbar {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 30px;
  background-color: rgb(81, 81, 131);
  margin-bottom: 20px;
  padding: 10px;
}

.btn {
  border-radius: 15%;
}

.btn:hover {
  background-color: #ddd;
  cursor: pointer;
}
</style>

