const projectId = require('../constants/project-id')

module.exports = ({ collection, document }) => {
  const parts = ['projects', projectId, 'databases', '(default)']
  if (collection && collection.length) {
    parts.push('documents')
    parts.push(collection)
  }
  if (document && document.length) {
    parts.push(document)
  }
  return parts.join('/')
}
