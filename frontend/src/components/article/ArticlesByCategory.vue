<template>
  <div class="articles-by-category">
    <PageTitle icon="fa fa-folder-o" :main="category.name" sub="Categoria" />
    <ul>
        <li v-for="article in articles" :key="article.id">
            {{ article.name }}
        </li>
    </ul>
    <div class="load-more">
        <button v-if="loadMore" class="btn btn-lg btn-outline-primary" @click="getArticles">Carregar Mais Artigos</button>
    </div>
  </div>
</template>

<script>
import { baseApiUrl } from '../../global';
import axios from 'axios';
import PageTitle from '../template/PageTitle'

export default {
    name: 'ArticlesByCategory',
    components: {
        PageTitle
    },
    data: function () {
        return {
            category: {},
            articles: [],
            page: 1,
            loadMore: true
        }
    },
    methods: {
        getCategory(){
            const url = `${baseApiUrl}/categories/${this.category.id}`
            axios(url).then(response => this.category = response.data)
        },
        getArticles(){
            const url = `${baseApiUrl}/categories/${this.category.id}/articles?page=${this.page}`
            axios(url).then(response => {
                this.articles = this.articles.concat(response.data)
                this.page++

                if(response.data.length === 0) this.loadMore = false
            })
        }
    },
    mounted() {
        this.category.id = this.$route.params.id
        this.getCategory()
        this.getArticles()
    }
}
</script>

<style>
.articles-by-category ul {
    list-style-type: none;
    padding-top: 0px;
}

.articles-by-category .load-more {
    display: flex;
    flex-direction: column;
    align-items: center
}
</style>