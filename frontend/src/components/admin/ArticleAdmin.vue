<template>
  <div class="article-admin">
    <b-form>
      <input type="hidden" id="article-id" v-model="article.id">
      <b-form-group label="Nome:" label-for="article-name">
        <b-form-input id="article-name" type="text" v-model="article.name" required
          placeholder="Informe o nome do artigo" :readonly="mode === 'remove'">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Descrição:" label-for="article-description">
        <b-form-input id="article-description" type="text" v-model="article.description" required
          placeholder="Informe a descrição do artigo" :readonly="mode === 'remove'">
        </b-form-input>
      </b-form-group>
      <b-form-group v-if="mode === 'save'" label="Imagem (URL):" label-for="article-imageUrl">
        <b-form-input id="article-imageUrl" type="text" v-model="article.imageUrl" required
          placeholder="Informe a URL da imagem" :readonly="mode === 'remove'">
        </b-form-input>
      </b-form-group>
      <b-form-group v-if="mode === 'save'" label="Categoria:" label-for="article-category-id">
        <b-form-select id="article-category-id" :options="categories" v-model="article.categoryId" />
      </b-form-group>
      <b-form-group v-if="mode === 'save'" label="Autor:" label-for="article-user-id">
        <b-form-select id="article-user-id" :options="users" v-model="article.userId" />
      </b-form-group>
      <b-form-group v-if="mode === 'save'" label="Conteúdo:" label-for="article-content">
        <VueEditor v-model="article.content" placeholder="Informe o Conteúdo do Artigo" />
      </b-form-group>
      <b-button variant="primary" v-if="mode === 'save'" @click="save">Salvar</b-button>
      <b-button variant="danger" v-if="mode === 'remove'" @click="remove">Excluir</b-button>
      <b-button class="ml-2" @click="reset">Cancelar</b-button>
    </b-form>
    <hr>
    <b-table hover striped :items="articles" :fields="fields">
      <template slot="actions" slot-scope="data">
        <b-button variant="warning" @click="loadArticle(data.item)" class="mr-2">
          <i class="fa fa-pencil"></i>
        </b-button>
        <b-button variant="danger" @click="loadArticle(data.item, 'remove')">
          <i class="fa fa-trash"></i>
        </b-button>
      </template>
    </b-table>
    <b-pagination size="md" v-model="page" :total-rows="count" :per-page="limit" />

  </div>
</template>
  
<script>
import { VueEditor } from 'vue2-editor';
import { baseApiUrl, showError } from '@/global';
import axios from 'axios'

export default {
  name: 'ArticleAdmin',
  components: {
    VueEditor
  },
  data: function () {
    return {
      mode: 'save',
      article: {},
      articles: [],
      categories: [],
      users: [],
      page: 1,
      limit: 0,
      count: 0,
      fields: [
        { key: 'id', label: 'Código', sortable: true },
        { key: 'name', label: 'Nome', sortable: true },
        { key: 'description', label: 'Descrição', sortable: true },
        { key: 'actions', label: 'Ações' }
      ]
    }
  },
  methods: {
    loadArticles() {
      axios.get(`${baseApiUrl}/articles?page=${this.page}`).then(response => {
        this.articles = response.data
        this.articles = response.data.data
        this.count = response.data.count
        this.limit = response.data.limit
      })
    },
    reset() {
      this.mode = 'save'
      this.article = {}
      this.loadArticles();
    },
    save() {
      const method = this.article.id ? 'put' : 'post';
      const id = this.article.id ? `/${this.article.id}` : ''
      axios[method](`${baseApiUrl}/articles${id}`, this.article)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch(showError)
    },
    remove() {
      const id = this.article.id
      axios.delete(`${baseApiUrl}/articles/${id}`)
        .then(() => {
          this.$toasted.global.defaultSuccess()
          this.reset()
        })
        .catch((showError))
    },
    loadArticle(article, mode = 'save') {
      this.mode = mode
      //this.article = { ...article }
      axios.get(`${baseApiUrl}/articles/${article.id}`)
        .then(response => this.article = response.data)
    },
    loadCategories() {
      axios.get(`${baseApiUrl}/categories`).then(response => {
        this.categories = response.data.map(category => {
          return { value: category.id, text: category.path }
        })
      })
    },
    loadUsers() {
      axios.get(`${baseApiUrl}/users`).then(response => {
        this.users = response.data.map(user => {
          return { value: user.id, text: `${user.name} - ${user.email}` }
        })
      })
    },
  },
  watch: {
    page() {
      this.loadArticles()
    }
  },
  mounted() {
    this.loadArticles()
    this.loadCategories()
    this.loadUsers()
  }
}
</script>
  
<style>

</style>