import admin from '.'

const sponsors = require('../../data/sponsors.json')

export default () => {
  const db = admin.firestore()
  const sponsorsRef = db.collection('sponsors')
  return Promise.all(
    Object.keys(sponsors).map(key => sponsorsRef.doc(key).set(sponsors[key]))
  )
}
