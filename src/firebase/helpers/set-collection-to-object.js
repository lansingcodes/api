module.exports = (firebaseAdmin, collection, data) => {
  const ref = firebaseAdmin.firestore().collection(collection)
  const promises = Object.keys(data).map((key) => ref.doc(key).set(data[key]))
  return Promise.all(promises)
}
