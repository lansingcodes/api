console.log('Testing environment variables...')
console.log(
  'FIREBASE_SERVICE_ACCOUNT length:',
  process.env.FIREBASE_SERVICE_ACCOUNT
    ? process.env.FIREBASE_SERVICE_ACCOUNT.length
    : 'NOT SET'
)
console.log('FIREBASE_PROJECT:', process.env.FIREBASE_PROJECT || 'NOT SET')

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    const parsed = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    console.log('✅ Service account parsed successfully')
    console.log('Project ID:', parsed.project_id)
  } catch (error) {
    console.log('❌ Failed to parse service account JSON:', error.message)
    console.log(
      'First 100 chars:',
      process.env.FIREBASE_SERVICE_ACCOUNT.substring(0, 100)
    )
  }
}
