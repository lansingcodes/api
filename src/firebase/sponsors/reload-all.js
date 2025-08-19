const deleteAllSponsors = require('./delete-all')
const setAllSponsors = require('./set-all')

module.exports = (firebaseAdmin) =>
  deleteAllSponsors(firebaseAdmin).then(() => setAllSponsors(firebaseAdmin))
