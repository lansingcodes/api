const { google } = require('googleapis')
const serviceAccount = require('../constants/service-account')

const scopes = [
  'https://www.googleapis.com/auth/cloud-platform',
  'https://www.googleapis.com/auth/datastore'
]

const jwtClient = new google.auth.JWT(
  serviceAccount.client_email,
  null,
  serviceAccount.private_key,
  scopes
)

module.exports = () =>
  new Promise((resolve, reject) => {
    jwtClient.authorize((error, tokens) => {
      if (error) {
        reject(error)
      } else if (tokens.access_token === null) {
        reject(
          new Error(
            'Service account does not have permission to generate access tokens'
          )
        )
      } else {
        resolve(tokens.access_token)
      }
    })
  })
