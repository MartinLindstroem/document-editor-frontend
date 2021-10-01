<template>
  <div class="form">
    <h1>Sign up</h1>
    <form class="registerForm">
      <p hidden id="successMsg">Register successfull!</p>
      <label for="username">Username</label><br />
      <input
        class="usernameInput"
        id="usernameInput"
        v-model="username"
        type="text"
        required
        minlength="3"
      />
      <br />
      <br />
      <label for="password">Password</label><br />
      <input
        class="passwordInput"
        id="passwordInput"
        v-model="password"
        type="password"
        required
        minlength="3"
      />
      <br />
      <input type="checkbox" id="pwCheckbox" v-on:click="showPassword" /> Show
      password
      <br />
      <br />
      <button class="register-btn" v-on:click="registerUser">Register</button>
      <br />
      <br />
    </form>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    registerUser: function () {
      const successMsg = document.getElementById("successMsg");
      let user = {
        username: this.username,
        password: this.password,
      };
      if (this.username.length >= 3 && this.password.length >= 3) {
        fetch("https://jsramverk-editor-mamv18.azurewebsites.net/register", {
          body: JSON.stringify(user),
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.errors) {
              console.log(data.errors);
            } else {
              successMsg.removeAttribute("hidden");
            }
          });
        this.username = "";
        this.password = "";
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

#successMsg {
  color: #0e0;
}
</style>