const documentPath = require('./document-path')

class FirestoreDocument {
  constructor(collection, document) {
    this.name = documentPath({ collection, document })
    this.fields = {}
  }

  stringValue(name, stringValue) {
    this.fields[name] = { stringValue }
    return this
  }
}

module.exports = FirestoreDocument
