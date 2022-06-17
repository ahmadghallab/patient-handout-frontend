<template>
  <v-row>
    <v-col md="8" offset-md="2">
      <v-card
        class="mx-auto px-2 py-3"
        >
        <v-card-title>
          <h2 class="font-weight-bold">
            {{ item.title }}
          </h2>
        </v-card-title>
        <v-card-text>
          <p>{{ item.tags }}</p>
          <div class="text--primary body-1" v-html="item.body"></div>
        </v-card-text>
      </v-card>
      <v-divider />
      <v-btn 
        class="mt-4"
        color="brown darken-4"
        text 
        @click.stop="editDialog = true"
        >
        Edit
      </v-btn>
      <v-dialog 
        v-model="editDialog"
        fullscreen hide-overlay transition="dialog-bottom-transition">
        <v-card>
          <v-toolbar dark color="deep-purple accent-4">
            <v-btn icon dark @click="editDialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ item.title }}</v-toolbar-title>
            <div class="flex-grow-1"></div>
            <v-toolbar-items>
              <v-btn dark text @click="updateHandout">Save</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-container>
            <v-row>
              <v-col md="6" offset-md="3">
                <v-text-field
                  label="Title"
                  placeholder="Title"
                  v-model="item.title"
                ></v-text-field>
                <v-text-field
                  label="Tags"
                  placeholder="Tags"
                  v-model="item.tags"
                ></v-text-field>
                <v-textarea
                  label="Body"
                  placeholder="Body"
                  v-model="item.body"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>
    </v-col>
    <v-snackbar
      v-model="snackbar"
    >
      {{ text }}
      <v-btn
        color="pink"
        text
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-row>
</template>
<script>
export default {
  head () {
    return {
      title: this.item.title
    }
  },
  async asyncData({ $axios, params }) {
    try {
      const item = await $axios.$get(`/handout/${params.id}`)
      return { item }
    } catch (e) {
      return { item: [] }
    }
  },
  data () {
    return {
      editDialog: false,
      snackbar: false,
      text: '',
      item: {
        title: '',
        body: '',
        tags: ''
      }
    }
  },
  computed: {
    tags () {
      return this.item.tags.split(',')
    }
  },
  methods: {
    async updateHandout () {
      try {
        await this.$axios.$patch(`/handout/${this.item.id}`, this.item)
        this.editDialog = false
        this.snackbar = true
        this.text = 'Handout updated successfully'
      } catch (e) {
        console.log(e)
      }
    },
  }
}
</script>
