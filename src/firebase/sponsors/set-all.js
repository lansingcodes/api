const sponsors = require('../../../data/sponsors.json')

module.exports = firebaseAdmin => {
  const sponsorsRef = firebaseAdmin.firestore().collection('sponsors')
  const promises = Object.keys(sponsors).map(key =>
    sponsorsRef.doc(key).set(sponsors[key])
  )
  return Promise.all(promises)
}
