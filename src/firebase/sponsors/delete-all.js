const deleteCollection = require('../helpers/delete-collection')

module.exports = firebaseAdmin => deleteCollection(firebaseAdmin, 'sponsors')
