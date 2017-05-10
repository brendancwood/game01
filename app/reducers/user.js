import TYPES from '../actions/types'

const initialState = {data: {}, isFetching: false, isAuthenticated: false}

export default function(state = initialState, action) {
  switch(action.type) {
    case TYPES.REQUEST_USER_INFO:
      return {
        data: {},
        isFetching: true
      }
    case TYPES.RECEIVE_USER_INFO:
      return {
        data: action.payload.data,
        isFetching: false
      }
  }
  return state
}
