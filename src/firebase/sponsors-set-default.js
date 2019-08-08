const initializeHttpClient = require('./http/initialize-http-client')
const sponsorToDocument = require('./translators/sponsor-to-document')

const sponsors = require('../../data/sponsors.json')

module.exports = () =>
  initializeHttpClient().then(firebaseHttpClient => {
    const promises = Object.keys(sponsors).map(key => {
      const document = sponsorToDocument(key, sponsors[key])
      return firebaseHttpClient.patch(document.name, document)
    })
    return Promise.all(promises)
  })
