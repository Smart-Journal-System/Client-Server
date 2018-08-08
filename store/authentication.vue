<script type="text/javascript">
    import axios from 'axios'

    const API = 'http://localhost:8000/api/'

    // Export this Vuex state module in order to import it in
    // the root of our application
    export default {
        state: {
            jwt: !process.server ? (localStorage.getItem('jwt') ? localStorage.getItem('jwt') : null) : null,
            user: null,
            error: null,
            signingIn: false,
            verificationStarted: false,
        },
        mutations: {
            verificationStart (state) {
                state.verificationStarted = true;
            },
            verificationSuccess (state, payload) {
                state.verificationStarted = false;
            },

            // Sign-In
            signInStart (state) {
                state.signingIn = true;
            },
            signInError (state, payload) {
                state.error = payload
                state.signingIn = false
            },
            signInSuccess (state, payload) {
                state.error = null;
                state.signingIn = false

                state.user = payload.user
                state.jwt = payload.jwt
            },

            // Sign-Out
            signOut (state) {
                state.user = null;
                state.jwt = null;
            }
        },
        actions: {
            // Sign a User into our application, updating our global state accordingly
            // with their primitive User object, and their JWT
            signIn (store, payload) {
                store.commit('signInStart');

                axios.post(API + 'signIn', {
                    username: payload.username,
                    password: payload.password,
                })
                    .then(function(response) {
                        if (response.data.status == true) {
                            let user = response.data.user;
                            let jwt = response.data.jwt;

                            if (!process.server) {
                                localStorage.setItem('jwt', jwt);
                            }

                            store.commit('signInSuccess', {
                                user,
                                jwt
                            });

                            return;
                        }

                        store.commit('signInError', response.data.message);
                    })
                    .catch(function(error) {
                        store.commit('signInError', error.response.data.message);
                    })
            },
            signOut (store) {
                localStorage.removeItem('jwt');

                store.commit('signOut');
            }
        }
    }
</script>
