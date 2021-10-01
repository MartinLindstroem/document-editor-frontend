<template>
  <div class="form">
    <h1>Sign in</h1>
    <form class="LoginForm">
      <p hidden id="errorMsg">User not found</p>
      <p hidden id="successMsg">Login successfull!</p>
      <label for="username">Username</label><br />
      <input id="usernameInput" v-model="username" type="text" required />
      <br />
      <br />
      <label for="password">Password</label><br />
      <input id="passwordInput" v-model="password" type="password" required />
      <br />
      <input type="checkbox" id="pwCheckbox" v-on:click="showPassword" /> Show
      password
      <br />
      <br />
      <button class="login-btn" v-on:click="signInUser">Sign in</button>
      <br />
      <br />
      <p>Dont have an account?</p>
      <router-link class="nav-link" to="/register">Sign up</router-link>
    </form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      username: "",
      password: "",
      documents: "",
    };
  },
  methods: {
    signInUser: function () {
      const errorMsg = document.getElementById("errorMsg");
      const successMsg = document.getElementById("successMsg");
      if (this.username && this.password) {
        let user = {
          username: this.username,
          password: this.password,
        };
        fetch("https://jsramverk-editor-mamv18.azurewebsites.net/login", {
          body: JSON.stringify(user),
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.errors) {
              errorMsg.removeAttribute("hidden");
            } else {
              errorMsg.style.visibility = "hidden";
              localStorage.setItem(
                "user",
                JSON.parse(JSON.stringify(data.data.user.username))
              );

              localStorage.setItem(
                "jwt",
                JSON.parse(JSON.stringify(data.data.token))
              );
              this.$emit("getUserDocuments");
              this.username = "";
              this.password = "";

              successMsg.removeAttribute("hidden");
            }
          });
      }
    },
    showPassword: function () {
      const passwordInput = document.getElementById("passwordInput");
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
      } else {
        passwordInput.type = "password";
      }
    },
  },
};
</script>

<style scoped>
input {
  border-radius: 20px;
  font-size: 1rem;
  padding: 10px 20px;
  line-height: 150%;
  /* border-color: blueviolet; */
}

.register-btn {
  border-radius: 10px;
  padding: 10px 20px;
}

.form {
  text-align: center;
}

input:invalid {
  border: 2px solid red;
}

input:valid {
  border: 2px solid black;
}

#errorMsg {
  color: red;
}

#successMsg {
  color: #0e0;
}
</style>