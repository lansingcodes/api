const FirestoreDocument = require('../builders/firestore-document')

module.exports = event => {
  const document = new FirestoreDocument('events', event.id)
  document.stringValue('group', event.group)
  document.stringValue('name', event.name)
  document.stringValue('url', event.url)
  if (event.description) {
    document.stringValue('description', event.description)
  }
  if (event.venue) {
    document.stringValue('venue', event.venue)
  }
  if (event.address) {
    document.stringValue('address', event.address)
  }
  if (event.startTime) {
    document.integerValue('startTime', event.startTime)
  }
  return document
}
