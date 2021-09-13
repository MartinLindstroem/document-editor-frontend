<template>
  <div id="app">
    <Toolbar
      :editorContent="textContent"
      :documentName="docName"
      :documents="docsList"
      @select="selectDocument"
      @inputData="updateTextContent"
      @inputName="updateDocName"
    />
    <TextEditor
      @inputData="updateTextContent"
      @inputName="updateDocName"
      :selectedDoc="selectedDoc"
    />
  </div>
</template>

<script>
import TextEditor from "./components/TextEditor.vue";
import Toolbar from "./components/Toolbar.vue";

export default {
  name: "App",
  components: {
    TextEditor,
    Toolbar,
  },
  data: function () {
    return {
      textContent: "",
      docName: "",
      selectedDoc: "",
      docsList: "",
    };
  },
  methods: {
    updateTextContent(value) {
      this.textContent = value;
    },
    updateDocName(value) {
      this.docName = value;
    },
    selectDocument(value) {
      this.selectedDoc = value;
    },
    getAllDocuments: function () {
      fetch("https://jsramverk-editor-mamv18.azurewebsites.net/getAll")
        .then((response) => response.json())
        .then((data) => (this.docsList = JSON.parse(JSON.stringify(data))));
    },
  },
  beforeMount() {
    this.getAllDocuments();
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
