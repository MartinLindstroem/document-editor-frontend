<template>
  <div>
    <toolbar :editorContent="this.editorContent" />
    <VueTrix v-model="editorContent" autofocus localStorage />
  </div>
</template>

<script>
import VueTrix from "vue-trix";
import Toolbar from "@/components/Toolbar.vue";
export default {
  name: "TextEditor",
  components: {
    VueTrix,
    Toolbar,
  },
  data: function () {
    return {
      editorContent: "",
    };
  },
  methods: {
    updateEditorContent(value) {
      this.editorContent = value;
    },
  },
  watch: {
    editorContent: {
      handler: "updateEditorContent",
    },
  },
};
</script>

<style scoped>
</style>

