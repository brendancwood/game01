import axios from 'axios'

import { URLS, REDDIT_APP } from './constants'

export default {
  processRedirectURI(nextState, replace, callback) {
    const { query } = nextState.location
    if (query.error) return
    const { code } = query
    // also get state and verify it was the same
    new Promise(resolve => {
      this.getAccessToken(code).then(response => {
        resolve(response)
      })
      .then(isLoggedIn => {
        if (isLoggedIn) {
          replace('/landing')
          callback()
        }
      })
    })
  },

  setAxiosConfig(token) {
    axios.defaults.baseURL = URLS.oauth_api
    axios.defaults.withCredentials = true
    axios.defaults.headers.common['Authorization'] = `bearer: ${token}`
  },

  getAccessToken(code) {
    const payload = {
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDDIT_APP.REDIRECT_URI
    }
    const config = {auth: {username: REDDIT_APP.CLIENT_ID, password: REDDIT_APP.CLIENT_SECRET}}
    return axios.post(URLS.access_token, payload, config).then(data => {
      this.setAxiosConfig(data.access_token)
      return true
    })
  }
}
