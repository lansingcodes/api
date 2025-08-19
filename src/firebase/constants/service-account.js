if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  throw new Error('FIREBASE_SERVICE_ACCOUNT environment variable is not set. Please check your environment configuration.')
}
module.exports = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
