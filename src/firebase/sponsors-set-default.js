const initializeAxios = require('./http/initialize-axios')
const sponsorToDocument = require('../firebase/translators/sponsor-to-document')

const sponsors = require('../../data/sponsors.json')

module.exports = () =>
  initializeAxios().then(axios => {
    const promises = Object.keys(sponsors).map(key => {
      const document = sponsorToDocument(key, sponsors[key])
      return axios.patch(document.name, document)
    })
    return Promise.all(promises)
  })
