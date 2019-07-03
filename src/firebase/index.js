import admin from 'firebase-admin'

let initialized = false

export default () => {
  if (!initialized) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
    initialized = true
  }
  return admin
}
