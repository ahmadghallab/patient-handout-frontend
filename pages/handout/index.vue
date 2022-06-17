<template>
  <v-row>
    <v-col
      md="8" 
      offset-md="2"
      >
      <v-card
        class="mx-auto mb-4"
        v-for="item in items"
        :key="item.id"
      >
        <v-card-title>
          <nuxt-link :to="`/handout/${item.id}`">{{ item.title }}</nuxt-link>
        </v-card-title>
        <v-card-text>
          {{ strippedContent(item.body.substr(0, 250)) }}
          <div class="mt-4">
            <v-chip
              class="mr-2"
              label
              v-for="tag in item.tags.split(',')"
              :key="tag"
            >
              <span class="mt-1">{{ tag }}</span>
            </v-chip>
          </div>
        </v-card-text>
      </v-card>
      <div class="row mt-4" justify="center" no-gutters v-if="lastPage > 1">
        <v-col class="text-right">
          <v-btn large color="deep-purple accent-4 white--text" :to="{ path: '/handout', query: { page: currentPage-1 }}" :disabled="currentPage == 1"> 
            <span class="mt-1">Previous</span>
          </v-btn>
        </v-col>
        <v-col class="text-left">
          <v-btn large color="deep-purple accent-4 white--text" :to="{ path: '/handout', query: { page: currentPage+1 }}" :disabled="currentPage == lastPage">
            <span class="mt-1">Next</span>
          </v-btn>
        </v-col>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  head () {
    return {
      title: 'Handouts list'
    }
  },
  watchQuery: ['page', 'q'],
  async asyncData ({ $axios, params, query }) {
    console.log(query)
    
    let queryParams = ''
    if (query.page && query.q) {
      queryParams = `?q=${query.q}&page=${query.page}`
    } else if (query.page) {
      queryParams = `?page=${query.page}`
    } else if (query.q) {
      queryParams = `?q=${query.q}`
    }
    try {
      const items = await $axios.$get(`/handout${queryParams}`)
      return { 
        items: items.data,
        currentPage: items.current_page ,
        lastPage: items.last_page 
        }
    } catch (e) {
      return { items: [] }
    }
  },
  data () {
    return {
      currentPage: null,
      lastPage: null,
      deleteDialog: false,
      editDialog: false,
      dialogId: null,
      items: []
    }
  },
  methods: {
    async deleteItem(id, index) {
      try {
        await this.$axios.$delete(`/handout/${id}`);
        this.deleteDialog = false
        this.dialogId = null
        this.items.splice(index, 1)
      } catch (e) {
        console.log(e);
      }
    },
    showDialog (id) {
      this.deleteDialog = true
      this.dialogId = id
    },
    strippedContent(content) {
      let regex = /(<([^>]+)>)/ig;
      return content.replace(regex, "");
    }
  }
}
</script>