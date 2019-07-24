const FirestoreDocument = require('../builders/firestore-document')

module.exports = (key, group) => {
  const document = new FirestoreDocument('groups', key)
  document.stringValue('name', group.name)
  document.stringValue('url', group.url)
  document.stringValue('schedule', group.schedule)
  document.stringValue('description', group.description)
  if (group.slug) {
    document.stringValue('slug', group.slug)
  }
  if (group.iconText) {
    document.stringValue('iconText', group.iconText)
  }
  if (group.iconSet) {
    document.stringValue('iconSet', group.iconSet)
  }
  if (group.iconName) {
    document.stringValue('iconName', group.iconName)
  }
  return document
}
