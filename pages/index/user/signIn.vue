<style scoped>

html,
body {
    height: 100%;
}

body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
}

.form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}

.form-signin .checkbox {
    font-weight: 400;
}

.form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
}

.form-signin .form-control:focus {
    z-index: 2;
}

.form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
}

</style>

<template>

<div class="container">
    <form class="form-signin" @submit.prevent="login()" v-if="!$store.state.authentication.jwt">
        <img class="mb-4" alt="" width="72" height="72">
        <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label for="inputEmail" class="sr-only">Username / Email</label>
        <input type="text" id="inputEmail" class="form-control" placeholder="Email address" v-model="username">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password">
        <div class="checkbox mb-3">
            <label>
                <input type="checkbox" value="remember-me"> Remember me
            </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p class="mt-5 mb-3 text-muted">©</p>
    </form>
</div>

</template>

<script>

export default {
    name: 'Login',

    data() {
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
