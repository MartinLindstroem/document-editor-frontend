<template>
  <div id="app">
    <Header />
    <router-view
      name="toolbar"
      :editorContent="textContent"
      :documentName="docName"
      :documents="docsList"
      :userList="userList"
      @select="selectDocument"
      @inputData="updateTextContent"
      @inputName="updateDocName"
    ></router-view>
    <router-view
      name="textEditor"
      @inputData="updateTextContent"
      @inputName="updateDocName"
      @addUsers="addAllowedUsers"
      :selectedDoc="selectedDoc"
    ></router-view>
    <router-view
      name="login"
      @getUserDocuments="getAllUserDocuments"
    ></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./components/Header.vue";

export default {
  name: "App",
  components: {
    Header,
  },
  data: function () {
    return {
      textContent: "",
      docName: "",
      userList: "",
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
    getDocuments: function (value) {
      this.docsList = value;
    },
    addAllowedUsers(value) {
      this.userList = value;
    },
    getAllUserDocuments: function () {
      fetch("https://jsramverk-editor-mamv18.azurewebsites.net/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: `{userDocuments(username: "${localStorage.getItem(
            "user"
          )}") {_id, name, content, created_by, auth_users}}`,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.docsList = JSON.parse(JSON.stringify(data.data.userDocuments));
        });
    },
  },
  beforeMount() {
    if (localStorage.getItem("user")) {
      this.getAllUserDocuments();
    }
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

* {
  box-sizing: border-box;
}
</style>
