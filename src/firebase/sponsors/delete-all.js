module.exports = firebaseAdmin => {
  const sponsorsRef = firebaseAdmin.firestore().collection('sponsors')
  return sponsorsRef.listDocuments().then(docs => {
    const deletions = docs.map(doc => doc.delete())
    return Promise.all(deletions)
  })
}
