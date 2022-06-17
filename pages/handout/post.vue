<template>
  <v-row>
    <v-col
      md="6"
      offset-md="3"
    >
      <v-container fluid>
        <v-text-field
          label="Title"
          v-model="handout.title"
          :rules="titleRules"
          placeholder="Title"
        ></v-text-field>
        <v-text-field
          label="Tags"
          v-model="handout.tags"
          placeholder="KlonoPIN, Adaptan, Conventin, Gabalepsy"
        ></v-text-field>
        <!-- <v-textarea
          label="Body"
          v-model="handout.body"
          :rules="bodyRules"
          placeholder="Content"
        ></v-textarea> -->
        <TextEditor v-model="handout.body" />
      </v-container>
      <v-card-actions>
        <div class="flex-grow-1"></div>
        <v-btn
          @click="submitHandout"
          large
          color="deep-purple accent-4 white--text"
        ><span class="mt-1">Post</span></v-btn>
      </v-card-actions>
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
import TextEditor from '@/components/TextEditor'
export default {
  components: {
    TextEditor,
  },
  head () {
    return {
      title: 'Add Handout'
    }
  },
  data () {
    return {
      snackbar: false,
      text: '',
      handout: {
        title: '',
        tags: '',
        body: ''
      },
      valid: true,
      title: '',
      titleRules: [
        v => !!v || 'Title is required'
      ],
      body: '',
      bodyRules: [
        v => !!v || 'Body is required'
      ]
    }
  },
  methods: {
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    async submitHandout () {
      try {
        await this.$axios.$post('/handout', this.handout)
        this.dialog = false
        this.snackbar = true
        this.text = 'Handout posted successfully'
        this.handout.title = ''
        this.handout.tags = ''
        this.handout.body = ''
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
