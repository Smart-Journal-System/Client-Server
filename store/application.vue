<script type="text/javascript">
    import axios from 'axios'

    const API = 'http://localhost:8000/api/'

    // Export this Vuex state module in order to import it in
    // the root of our application
    export default {
        state: {
            initialized: false,
            articles: [],
        },
        mutations: {
            initializationStart (state) {

            },
            initializationSuccess (state, payload) {
                state.initialized = true;
            },
            journals (state, payload) {
                state.journals = payload.journals
            },
            articles (state, payload) {
                state.articles = payload.articles
                state.articlesPage = payload.page
            },
        },
        actions: {
            journals (store, payload) {
                axios.get(API + 'journals')
                    .then((response) => {
                        store.commit('journals', { journals: response.data })
                    })
            },
            async articles (store, payload) {
                await axios.get(API + 'articles', {
                    params: {
                        page: payload.page
                    }
                })
                    .then((response) => {
                        store.commit('articles', { articles: response.data.data, page: payload.page })
                    })
            },
            initialize (store, payload) {
                store.commit('initializationStart');

                let jwt = localStorage.getItem('jwt');

                if (!jwt) {
                    store.commit('initializationSuccess');

                    return;
                }

                axios.get(API + 'signInJWT', {
                    params: {
                        token: jwt
                    }
                })
                    .then((response) => {
                        localStorage.setItem('jwt', response.data.jwt);

                        store.commit('signInSuccess', {
                            jwt: response.data.jwt,
                            user: response.data.user
                        });

                        setTimeout(function() {
                            store.commit('initializationSuccess');
                        }, 1500);
                    })
                    .catch((response) => {
                        localStorage.removeItem('jwt');
                        localStorage.removeItem('user');

                        store.commit('signOut');

                        setTimeout(function() {
                            store.commit('initializationSuccess');
                        }, 1500);
                    })
            },
        },
    }
</script>
