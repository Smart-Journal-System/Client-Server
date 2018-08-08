<template>
    <div id="app">
        <div v-if="!$store.state.application.initialized">
        <!-- <div v-if="!$store.state.application.initialized"> -->
            <div id="loader-wrapper">
                <div id="loader">
                    <!-- <fulfilling-bouncing-circle-spinner
                        class="sjs-spinner"
                        :size="150"
                        :animation-duration="1250"
                        :color="'#63b4c1'"
                    /> -->
                    <h6 class="mt-5">Smart Journal System is Loading...</h6>
                </div>
            </div>
        </div>
        <div v-else>
            {{ $store.state.application.journals }}
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top py-1">
                <a class="navbar-brand">Smart Journal System (rendered on {{ rendered }})</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse">
                    <ul style="color: white" class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <router-link
                                class="nav-link py-2 d-none d-md-inline-block"
                                :to="{ name: 'Main' }">Home
                            </router-link>
                        </li>
                        <li
                            class="nav-item"
                            v-if="!$store.state.authentication.jwt"
                        >
                        <nuxt-link to="/user/signIn">Login</nuxt-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                class="nav-link py-2 d-none d-md-inline-block"
                                :to="{ name: 'Register' }">Register
                            </router-link>
                        </li>
                        <li
                            class="nav-item"
                            v-if="$store.state.authentication.jwt">
                            <a
                                class="nav-link"
                                href="#"
                                v-on:click="$store.dispatch('signOut')"
                            >
                                Logout
                            </a>
                        </li>
                    </ul>
                    <nuxt-link to="/about">About</nuxt-link>
                    <ul style="color: white" class="nav navbar-nav navbar-right">
                        <li
                            v-if="$store.state.authentication.jwt"
                            class="nav-item">
                            Welcome, {{ $store.state.authentication.user.username }}
                        </li>
                    </ul>
                </div>
            </nav>

            <router-view/>
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
        async fetch ({ store, params }) {
            await store.dispatch('journals');
        },
        asyncData({ req }) {
            return {
                rendered: req ? 'server' : 'client'
            }
        },
        mounted () {
            this.$store.dispatch('initialize');
        },
    }
</script>

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
