const initializeHttpClient = require('./http/initialize-http-client')
const documentPath = require('./builders/document-path')
const maxEvents = require('./constants/max-events')

const eventsPath = documentPath({ collection: 'events' })
const eventKeysUrl = `${eventsPath}?pageSize=${maxEvents}&mask.fieldPaths=key`

module.exports = () =>
  initializeHttpClient().then(firebaseHttpClient =>
    firebaseHttpClient.get(eventKeysUrl).then(response => {
      if (!response.data || !response.data.documents) return []
      return response.data.documents.map(document => document.name)
    })
  )
