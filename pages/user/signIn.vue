<template>
    <div class="container">
        <div class="card card-container">
            <form class="form-signin" @submit.prevent="login()" v-if="!$store.state.authentication.jwt">
                <p class="text-danger">{{ $store.state.authentication.error }}</p>
                <input type="text" class="form-control" placeholder="Username or Email address" v-model="username" required autofocus>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" required>
                <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Sign in</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Login',

    data () {
        return {
            username: null,
            password: null,
        }
    },

    beforeRouteEnter(to, from, next) {
        next(vm => {
            // access to component instance via `vm`
            if (vm.$store.state.authentication.jwt !== null) {
                next('/');
            } else {
                next();
            }
        })
    },

    methods: {
        login: function() {
            this.$store.dispatch('signIn', {
                username: this.username,
                password: this.password,
            });
        },
        logout: function() {
            this.$store.dispatch('signOut');
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
