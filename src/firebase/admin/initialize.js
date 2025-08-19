const admin = require('firebase-admin')
const projectId = require('../constants/project-id')
const serviceAccount = require('../constants/service-account')

module.exports = () => {
  return admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${projectId}.firebaseio.com`,
  })
}
