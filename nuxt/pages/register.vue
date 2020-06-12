<template>
  <v-app id="scripting">
    <v-main>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>Register</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Name"
                    name="name"
                    prepend-icon="mdi-head-outline"
                    type="text"
                    v-model="userInfo.name"
                  ></v-text-field>

                  <v-text-field
                    label="Email"
                    name="email"
                    prepend-icon="mdi-email"
                    type="email"
                    v-model="userInfo.email"
                  ></v-text-field>
                  
                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock-outline"
                    type="password"
                    v-model="userInfo.password"
                  ></v-text-field>

                  <v-text-field
                    id="confirm-password"
                    label="Confirm password"
                    name="confirm-password"
                    prepend-icon="mdi-lock"
                    type="password"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="loginServer">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: '',
        email: '',
        password: ''
      },
    }
  },
  computed: {
    isDisabled: function() {
      if (
        this.userInfo.name === '' ||
        this.userInfo.email === '' ||
        this.userInfo.password === ''
      ) {
        return !this.isValid
      }
    }
  },
  methods: {
    handleFileUpload() {
      this.userInfo.music = this.$refs.file.files[0]
      console.log(this.userInfo.music.type)
    },
    loginServer() {
      let formData = new FormData()
      formData.append('name', this.userInfo.name)
      formData.append('email', this.userInfo.email)
      formData.append('password', this.userInfo.password)
      this.$axios
        .$post('/api/auth/register', {
          "email": this.userInfo.email,
          "username": this.userInfo.name,
          "password": this.userInfo.password
        })
        .then(response =>{
          console.log(response);
          console.log("lol");
          this.$router.push({
            path: '/login'
        })
        })
    }
  }
}
</script>
        this.$axios
          .$post('/api/auth/test', formData)
          .then(response =>{
            console.log(response)
          })