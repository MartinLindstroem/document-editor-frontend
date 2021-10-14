<template>
  <div>
    <form>
      <label for="docName">Document name</label><br />
      <input
        v-if="selectedDoc"
        v-model="selectedDoc.name"
        type="text"
        id="docInput"
      />
      <input v-else v-model="documentName" type="text" id="docInput" />
      <br />
      <label for="authUsers">Users</label><br />
      <input
        v-if="selectedDoc"
        v-model="selectedDoc.auth_users"
        type="text"
        id="docInput"
      />
      <input
        v-else
        v-model="allowedUsers"
        title="Give users access to the document. Enter the email addresses separated with a comma"
        type="text"
        placeholder="email1,email2"
        id="docInput"
      />
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
      allowedUsers: "",
    };
  },
  methods: {
    updateEditorContent() {
      this.$emit("inputData", this.editorContent);
    },
    updateDocName() {
      this.$emit("inputName", this.documentName);
    },
    addUsers() {
      let usersArray = this.allowedUsers.split(",");
      this.$emit("addUsers", usersArray);
    },
  },
  watch: {
    editorContent: {
      handler: "updateEditorContent",
    },
    documentName: {
      handler: "updateDocName",
    },
    allowedUsers: {
      handler: "addUsers",
    },
  },
};
</script>

<style scoped>
#docInput {
  /* border-radius: 20px; */
  font-size: 1rem;
  padding: 5px 10px;
  line-height: 150%;
}
</style>

