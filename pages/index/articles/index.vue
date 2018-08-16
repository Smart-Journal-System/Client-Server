<style scoped>

.article-even {}

.article-odd {
    background-color: #FCB07E;
}

</style>

<template>

<div class="">
    <div class="d-md-flex flex-wrap" style="margin: 5px;">
        <a v-on:click="next()">Next</a>
        <a v-on:click="previous()">Previous</a>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Title</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(article, index) in application.articles" v-bind:key="index">
                    <th scope="row">{{ article.id }}</th>
                    <td>
                        <nuxt-link :to="{ name: 'index-articles-id', params: { id: article.id } }">
                            {{ article.title }}
                        </nuxt-link>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>

</template>

<script>

import { mapState } from 'vuex'

export default {
    name: 'Articles',
    data() {
        return {
            page: null,
            state: this.$store.state
        }
    },
    url: {
        query: [
            'page'
        ]
    },
    async fetch({
        store,
        params,
        route
    }) {
        await store.dispatch('articles', { page: route.query.page });
    },
    methods: {
        next() {
            console.log(this.page);
            this.getArticles(this.page + 1)
        },
        previous() {
            this.getArticles(this.page - 1)
        },
        getArticles(page) {
            this.page = page;

            this.$store.dispatch('articles', {
                page: page
            });
        }
    },
    computed: mapState([
        'application'
    ])
}

</script>
