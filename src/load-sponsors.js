import setDefaultSponsors from './firebase/sponsors-set-default'

export function handler(event, context, callback) {
  setDefaultSponsors()
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: 'Successfully loaded sponsors'
      })
    })
    .catch(callback)
}
