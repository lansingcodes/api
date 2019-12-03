const initializeHttpClient = require('./http/initialize-http-client')

module.exports = eventPaths =>
  initializeHttpClient().then(firebaseHttpClient =>
    eventPaths.map(eventPath => firebaseHttpClient.delete(eventPath))
  )
