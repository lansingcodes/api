module.exports = firebaseAdmin => {
  const groupsRef = firebaseAdmin.firestore().collection('groups')
  return groupsRef.listDocuments().then(docs => {
    const deletions = docs.map(doc => doc.delete())
    return Promise.all(deletions)
  })
}
