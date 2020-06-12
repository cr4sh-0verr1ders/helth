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
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email"
                    name="Email"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="userInfo.email"
                  ></v-text-field>

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="userInfo.password"
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
        email: '',
        password: '',
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
    loginServer() {
      this.$axios
        .$post('/api/login', {
          "email": this.userInfo.email,
          "username": this.userInfo.name,
          "password": this.userInfo.password
        })
        .then(response =>{
          console.log(response);
          console.log("lol");
          this.$router.push({
            path: '/pending'
        })
        })
    }
  }
}
</script>