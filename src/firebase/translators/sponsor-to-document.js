const FirestoreDocument = require('../builders/firestore-document')

module.exports = (key, sponsor) => {
  const document = new FirestoreDocument('sponsors', key)
  document.stringValue('name', sponsor.name)
  document.stringValue('description', sponsor.description)
  document.stringValue('logoUrl', sponsor.logoUrl)
  document.stringValue('url', sponsor.url)
  return document
}
