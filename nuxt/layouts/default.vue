<template>
  <v-app dark>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="#58CFC4"
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn text router :to="loginPath">
        Provider Login
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      title: 'helth',
      loginPath: '/login'
    }
  }
}
</script>
