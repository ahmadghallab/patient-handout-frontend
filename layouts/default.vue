<template>
  <v-app>
    <v-app-bar dark color="deep-purple accent-4" fixed app>
      <v-toolbar-title>Patient Handout</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-toolbar-items>
        <v-btn to="/handout" text exact>Explore</v-btn>
        <v-btn to="/handout/post" text exact>Post</v-btn>
        <v-btn to="/logout" text exact>Logout</v-btn>
      </v-toolbar-items>
      <div class="flex-grow-1"></div>
      <v-form @submit.stop.prevent="search">
        <v-text-field
          hide-details
          label="Search"
          single-line
          name="q"
          v-model="q"
          autocomplete="false"
        ></v-text-field>
      </v-form>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
export default {
  data () {
    return {
      q: null
    }
  },
  methods: {
    search () {
      this.$router.push({path: '/handout', query: {q: this.q}})
    }
  }
}
</script>
<style lang="scss">
.v-application {
  font-family: 'Josefin Sans', sans-serif !important;
}
.v-application a {
  text-decoration: none;
  color: inherit;
}
.v-dialog {
  box-shadow: none;
}
</style>