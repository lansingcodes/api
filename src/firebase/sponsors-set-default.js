const sponsors = require('../../data/sponsors.json')

module.exports = firebaseAdmin => {
  const sponsorsRef = firebaseAdmin.firestore().collection('sponsors')

  return sponsorsRef
    .listDocuments()
    .then(docs => {
      // Delete the existing sponsors
      const deletions = docs.map(doc => doc.delete())
      return Promise.all(deletions)
    })
    .then(() => {
      // Then set the latest sponsors from the saved data
      const promises = Object.keys(sponsors).map(key => {
        return sponsorsRef.doc(key).set(sponsors[key])
      })
      return Promise.all(promises)
    })
}
