import axios from 'axios'

import TYPES from './types'
import { API } from '../constants'

export function requestingUserInfo() {
  return {
    type: TYPES.REQUEST_USER_INFO
  }
}

export function receiveUserInfo(data) {
  return {
    type: TYPES.RECEIVE_USER_INFO,
    payload: {data}
  }
}

export function fetchUserInfo() {
  return dispatch => {
    dispatch(requestingUserInfo())
    axios.get(API.me).then(data => {
      console.log(data)
      dispatch(receiveUserInfo(data))
    })
  }
}

export function fetchAccessToken() {
  axios.get('/api/auth/initialize').then(data => {
    return data
  })
}
