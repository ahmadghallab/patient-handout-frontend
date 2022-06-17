<template>
  <v-row>
    <v-col
      md="6"
      offset-md="3"
    >
      <v-card
        class="mx-auto"
      >
        <v-card-text>
          <div>Word of the Day</div>
          <p class="display-1 text--primary">
            Every year, more than a million people come to Mayo Clinic for care. Our highly specialized experts are deeply experienced in treating rare and complex conditions.
          </p>
          <p>adjective</p>
          <div class="text--primary">
            well meaning and kindly.<br>
            "a benevolent smile"
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            to="/handout"
            text
            color="deep-purple accent-4"
          >
            View Handouts
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  head () {
    return {
      title: 'Home page'
    }
  },
  data () {
    return {
      //
    }
  }
}
</script>
