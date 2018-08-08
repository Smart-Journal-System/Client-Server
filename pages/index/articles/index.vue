<style scoped>



</style>

<template>

<div class="container">
    <div class="card-columns">
        <div v-for="(article, index) in $store.state.application.articles" v-bind:key="index" class="card">
            <img class="card-img-top" alt="">
            <div class="card-body">
                <h5 class="card-title">{{ article.title }}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <nuxt-link class="btn btn-primary" :to="{ name: 'index-articles-id', params: { id: article.id } }">Articles</nuxt-link>
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default {
    name: 'Articles',
    data() {
        return {
            state: this.$store.state
        }
    },
    async fetch({
        store,
        params
    }) {
        await store.dispatch('articles');
    }

}

</script>
