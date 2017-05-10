const _ = require('lodash')

module.exports = {
  toQueryString: obj => {
    return _.map(obj, (v, k) => {
      return encodeURIComponent(k) + '=' + encodeURIComponent(v)
    }).join('&')
  }
}
