<template>
  <div class="toolbar">
    <select @change="joinSocketRoom" v-model="selected">
      <option value="" disabled selected hidden>Select document</option>
      <option
        v-for="doc in documents"
        :value="{
          _id: doc._id,
          name: doc.name,
          content: doc.content,
          auth_users: doc.auth_users,
        }"
        :key="doc.id"
      >
        {{ doc.name }}
      </option>
    </select>
    <button class="btn" v-on:click="log">log</button>
    <button class="btn" v-on:click="saveDocument">Save</button>
    <button class="btn" v-on:click="createPDF">PDF</button>
  </div>
</template>

<script>
import { jsPDF } from "jspdf";
export default {
  name: "Toolbar",
  props: ["editorContent", "documentName", "documents", "user", "userList"],
  data: function () {
    return {
      selected: "",
    };
  },
  sockets: {
    connect: function () {
      console.log("socket connected");
    },
    doc: function (data) {
      this.selected = JSON.parse(JSON.stringify(data));
    },
    sync: function () {
      this.$socket.emit("doc", this.selected);
    },
  },
  methods: {
    log: function () {
      console.log(this.documents);
    },
    saveDocument: function () {
      if (typeof this.selected.auth_users === "string") {
        this.selected.auth_users = this.selected.auth_users.split(",");
      }
      let document = {
        _id: this.selected._id ? this.selected._id : null,
        name: this.selected.name ? this.selected.name : this.documentName,
        content: this.selected.content
          ? this.selected.content
          : this.editorContent,
        created_by: localStorage.getItem("user"),
        auth_users: this.selected.auth_users
          ? this.selected.auth_users
          : this.userList,
      };
      if (this.selected._id) {
        fetch("https://jsramverk-editor-mamv18.azurewebsites.net/update", {
          body: JSON.stringify(document),
          headers: {
            "content-type": "application/json",
            "x-access-token": localStorage.getItem("jwt"),
          },
          method: "PUT",
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      } else {
        fetch("https://jsramverk-editor-mamv18.azurewebsites.net/insert", {
          body: JSON.stringify(document),
          headers: {
            "content-type": "application/json",
            "x-access-token": localStorage.getItem("jwt"),
          },
          method: "POST",
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
      }
    },
    selectDocument: function () {
      setTimeout(() => {
        this.$emit("select", this.selected);
      }, 100);
    },
    updateDocumentLive: function () {
      // setTimeOut is to prevent this.selected from bugging out if user types too fast
      setTimeout(() => {
        this.$socket.emit("doc", this.selected);
      }, 50);
    },
    joinSocketRoom: function () {
      this.$socket.emit("join", this.selected._id);
    },
    createPDF: function () {
      let doc = new jsPDF("p", "pt", "a4");
      doc.html(
        "<div style='width: 550px;'>" + this.selected.content + "</div>",
        {
          callback: function (doc) {
            // doc.output("dataurlnewwindow");
            window.open(doc.output("bloburl"), "_blank");
          },
          x: 10,
          y: 10,
        }
      );
    },
  },
  watch: {
    selected: {
      handler: "selectDocument",
    },
    "selected.content": {
      handler: "updateDocumentLive",
    },
    "selected.name": {
      handler: "updateDocumentLive",
    },
  },
};
</script>

<style>
.toolbar {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 50px;
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

