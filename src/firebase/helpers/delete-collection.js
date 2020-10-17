module.exports = (firebaseAdmin, collection) => {
  const sponsorsRef = firebaseAdmin.firestore().collection(collection)
  return sponsorsRef.listDocuments().then(docs => {
    const deletions = docs.map(doc => doc.delete())
    return Promise.all(deletions)
  })
}
