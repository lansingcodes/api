const groups = require('../../../data/groups.json')

module.exports = firebaseAdmin => {
  const groupsRef = firebaseAdmin.firestore().collection('groups')
  const promises = Object.keys(groups).map(key =>
    groupsRef.doc(key).set(groups[key])
  )
  return Promise.all(promises)
}
