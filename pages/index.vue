<style>

#loader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    overflow: hidden;
}

#loader {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 150px;
    height: 150px;
    margin: -75px 0 0 -75px;
}

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    text-align: center;
}

</style>

<template>

<div id="app">
    <div v-if="!$store.state.application.initialized">
        <div id="loader-wrapper">
            <div id="loader">
                <!-- <fulfilling-bouncing-circle-spinner class="sjs-spinner" :size="150" :animation-duration="1250" :color="'#63b4c1'" /> -->
                <h6 class="mt-5">SJS is Loading...</h6>
            </div>
        </div>
    </div>
    <div v-else>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="#">SJS <span class="alt">{{ rendered   }}</span></a>
            <div class="">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <nuxt-link class="nav-link" to="/">Home</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to="/user/signIn">Login</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to="/articles">Articles</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>
            </div>
        </nav>
        <nuxt-child/>
    </div>
</div>

</template>

<script>

// import { FulfillingBouncingCircleSpinner } from 'epic-spinners'

export default {
    name: 'App',
    components: {
        // FulfillingBouncingCircleSpinner
    },
    asyncData({
        req
    }) {
        return {
            rendered: req ? 'server' : 'client'
        }
    },
    mounted() {
        this.$store.dispatch('initialize');
    },
}

</script>
