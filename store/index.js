import Vuex from 'vuex'

import authenticationActions from './authentication'
import applicationActions from './application'

// Define a function that returns an instance of our Vuex Store
const store = () => {
  return new Vuex.Store({
      modules: {
          application: applicationActions,
          authentication: authenticationActions,
      }
  })
}

export default store
