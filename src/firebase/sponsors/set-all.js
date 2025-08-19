const setCollectionToObject = require('../helpers/set-collection-to-object')
const sponsors = require('../../../data/sponsors.json')

module.exports = (firebaseAdmin) =>
  setCollectionToObject(firebaseAdmin, 'sponsors', sponsors)
