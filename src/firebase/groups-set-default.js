const initializeHttpClient = require('./http/initialize-http-client')
const groupToDocument = require('./translators/group-to-document')

const groups = require('../../data/groups.json')

module.exports = () =>
  initializeHttpClient().then(firebaseHttpClient => {
    const promises = Object.keys(groups).map(key => {
      const document = groupToDocument(key, groups[key])
      return firebaseHttpClient.patch(document.name, document)
    })
    return Promise.all(promises)
  })
