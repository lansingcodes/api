const initializeAxios = require('./http/initialize-axios')
const groupToDocument = require('../firebase/translators/group-to-document')

const groups = require('../../data/groups.json')

module.exports = () =>
  initializeAxios().then(axios => {
    const promises = Object.keys(groups).map(key => {
      const document = groupToDocument(key, groups[key])
      return axios.patch(document.name, document)
    })
    return Promise.all(promises)
  })
