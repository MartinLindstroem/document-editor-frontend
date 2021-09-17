<template>
  <div>
    <form>
      <label for="docName">Document name</label><br />
      <input
        v-if="selectedDoc"
        v-model="selectedDoc.name"
        type="text"
        id="docName"
      />
      <input v-else v-model="documentName" type="text" id="docName" />
      <VueTrix
        v-if="selectedDoc"
        v-model="selectedDoc.content"
        id="textEditor"
        autofocus
      />
      <VueTrix v-else v-model="editorContent" id="textEditor" autofocus />
    </form>
  </div>
</template>

<script>
import VueTrix from "vue-trix";
export default {
  name: "TextEditor",
  components: {
    VueTrix,
  },
  props: ["selectedDoc"],
  data: function () {
    return {
      editorContent: "",
      documentName: "",
    };
  },
  methods: {
    updateEditorContent() {
      this.$emit("inputData", this.editorContent);
    },
    updateDocName() {
      this.$emit("inputName", this.documentName);
    },
  },
  watch: {
    editorContent: {
      handler: "updateEditorContent",
    },
    documentName: {
      handler: "updateDocName",
    },
  },
};
</script>

<style scoped>
#docName {
  margin-bottom: 15px;
  height: 20px;
  padding: 5px 5px;
}
</style>

