<template>
  <div class="toolbar">
    <select @change="joinSocketRoom" v-model="selected">
      <option value="" disabled selected hidden>Select document</option>
      <option
        v-for="doc in documents"
        :value="{ _id: doc._id, name: doc.name, content: doc.content }"
        :key="doc.id"
      >
        {{ doc.name }}
      </option>
    </select>
    <!-- <button class="btn" v-on:click="log">log</button> -->
    <button class="btn" v-on:click="saveDocument">Save</button>
  </div>
</template>

<script>
export default {
  name: "Toolbar",
  props: ["editorContent", "documentName", "documents"],
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
      console.log(JSON.parse(JSON.stringify(this.selected)));
    },
    saveDocument: function () {
      let document = {
        _id: this.selected._id ? this.selected._id : null,
        name: this.selected.name ? this.selected.name : this.documentName,
        content: this.selected.content
          ? this.selected.content
          : this.editorContent,
      };
      if (this.selected._id) {
        fetch("https://jsramverk-editor-mamv18.azurewebsites.net/update", {
          body: JSON.stringify(document),
          headers: {
            "content-type": "application/json",
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

