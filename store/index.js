import Vuex from 'vuex'

import authenticationActions from './authentication'
import applicationActions from './application'

const store = () => {
  return new Vuex.Store({
      modules: {
          application: applicationActions,
          authentication: authenticationActions,
      }
  })
}

export default store
