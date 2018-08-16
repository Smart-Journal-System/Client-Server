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

.bd-navbar {
    min-height: 4rem;
    background-color: #05668D;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, .05), inset 0 -1px 0 rgba(0, 0, 0, .1);
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
        <header class="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
            <div class="navbar-nav-scroll">
                <ul class="navbar-nav bd-navbar-nav flex-row">
                    <li class="nav-item">
                        <nuxt-link class="nav-link" to="/">Home</nuxt-link>
                    </li>
                    <li class="nav-item">
                        <nuxt-link class="nav-link" :to="{ path: '/articles', query: { page: 5 } }">Articles</nuxt-link>
                    </li>
                </ul>
            </div>

            <ul class="navbar-nav flex-row ml-md-auto d-none d-md-flex">
                <li class="nav-item dropdown" v-if="!authentication.user">
                    <nuxt-link class="nav-link" to="/user/signIn">Sign In</nuxt-link>
                </li>
                <li v-if="authentication.user">
                    <span>Welcome, {{ authentication.user.username }}</span>
                </li>
            </ul>
        </header>

        <nuxt-child/>
    </div>
</div>

</template>

<script>

// import { FulfillingBouncingCircleSpinner } from 'epic-spinners'
import { mapState } from 'vuex'

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
    computed: mapState([
        'authentication'
    ])
}

</script>
