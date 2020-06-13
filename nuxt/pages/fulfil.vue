
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
                <v-toolbar-title>Fulfil Prescription</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    id="oid"
                    label="ID"
                    name="ID"
                    v-model="oid"
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" v-on:click="loginServer">Mark Fulfilled</v-btn>
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
      oid: ""
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
        .$post('/api/fulfillPres', {
          "presID": this.oid
        })
    }
  }
}
</script>
