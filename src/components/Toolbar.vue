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
          created_by: doc.created_by,
          auth_users: doc.auth_users,
        }"
        :key="doc.id"
      >
        {{ doc.name }}
      </option>
    </select>
    <button class="btn" v-on:click="log">log</button>
    <button class="btn" v-on:click="saveDocument">Save</button>
    <button class="btn" v-on:click="createPDF">View PDF</button>
    <button type="button" class="btn" @click="showModal = true">
      Invite user
    </button>
    <Modal v-model="showModal" title="Invite user">
      <form novalidate>
        <div class="form-group">
          <label for="inputEmail">Email</label>
          <input
            id="inputEmail"
            type="email"
            class="emailInput"
            placeholder="Email"
            v-model="recipientEmail"
          />
        </div>
        <div class="modal-footer">
          <button class="sendBtn" type="button" @click="sendEmailInvitation">
            Invite
          </button>
        </div>
      </form>
    </Modal>
  </div>
</template>

<script>
import VueModal from "@kouts/vue-modal";
import "@kouts/vue-modal/dist/vue-modal.css";
import { jsPDF } from "jspdf";
export default {
  name: "Toolbar",
  props: [
    "editorContent",
    "documentName",
    "documents",
    "user",
    "userList",
    "url",
  ],
  components: {
    Modal: VueModal,
  },
  data: function () {
    return {
      selected: "",
      showModal: false,
      recipientEmail: "",
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
      console.log(this.selected);
    },
    saveDocument: function () {
      if (
        typeof this.selected.auth_users === "string" &&
        this.selected.auth_users.length > 0
      ) {
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
        fetch(this.url + "/update", {
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
        fetch(this.url + "/insert", {
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
    sendEmailInvitation: function () {
      const registerLink = window.location.href.slice(0, -6) + "register";
      if (this.selected) {
        let body = {
          to: this.recipientEmail,
          documentOwner: this.selected.created_by,
          documentName: this.selected.name,
          registerLink: registerLink,
        };
        this.showModal = false;
        fetch("https://jsramverk-editor-mamv18.azurewebsites.net/sendInvite", {
          body: JSON.stringify(body),
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
        })
          .then((response) => response.json())
          .then((data) => console.log(data));

        if (this.selected.auth_users === null) {
          this.selected.auth_users = this.recipientEmail;
        } else {
          this.selected.auth_users.push(this.recipientEmail);
        }

        this.saveDocument();
      } else {
        alert("You need to select a document");
      }
      this.showModal = false;
      this.recipientEmail = "";
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

<style scoped>
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

.modal-footer {
  padding: 15px 0px 0px 0px;
  border-top: 1px solid #e5e5e5;
  margin-left: -14px;
  margin-right: -14px;
  display: flex;
}

.emailInput {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

.sendBtn {
  width: 20%;
  justify-content: center;
  margin: 0 auto;
  background-color: #4caf50;
  color: #eee;
  border: none;
  font-size: 1rem;
  padding: 7px;
}

.sendBtn:hover {
  background-color: #45a049;
  cursor: pointer;
}
</style>

