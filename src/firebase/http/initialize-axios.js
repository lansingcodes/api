const axios = require('axios')
const requestAccessToken = require('./request-access-token')

module.exports = () =>
  requestAccessToken().then(accessToken => {
    axios.defaults.baseURL = 'https://firestore.googleapis.com/v1'
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    // console.log(axios.defaults.headers.common.Authorization)
    return axios
  })
