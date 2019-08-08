const axios = require('axios')
const requestAccessToken = require('./request-access-token')

module.exports = () =>
  requestAccessToken().then(accessToken => {
    const firebaseHttpClient = axios.create({
      baseURL: 'https://firestore.googleapis.com/v1'
    })
    firebaseHttpClient.defaults.headers.common[
      'Authorization'
    ] = `Bearer ${accessToken}`
    // console.log(firebaseHttpClient.defaults.headers.common.Authorization)
    return firebaseHttpClient
  })
