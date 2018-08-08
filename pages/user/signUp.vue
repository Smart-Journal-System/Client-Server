<template>
    <div class="container">
        <div class="card card-container">
            <form class="form-signin" @submit.prevent="register()">
                <input type="text" class="form-control" placeholder="Name" v-model="username" required autofocus>
                <input type="text" class="form-control" placeholder="Email address" v-model="email" required autofocus>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password" required>
                <input type="password" class="form-control" placeholder="Password Confirmation" v-model="password_confirmation" required>
                <button class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Register',

    data () {
        return {
            username: null,
            email: null,
            password: null,
            password_confirmation: null
        }
    },

    methods: {
        register: function() {
            axios.post(API + 'register', {
                username: this.username,
                email: this.email,
                password: this.password,
                password_confirmation: this.password_confirmation
            })
            .then(function(response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        }

    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
