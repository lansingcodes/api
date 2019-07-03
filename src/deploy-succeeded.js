import setDefaultSponsors from './firebase/sponsors-set-default'

export function handler(event, context, callback) {
  Promise.all([setDefaultSponsors()])
    .then(() => {
      callback(null, {
        statusCode: 200,
        body: 'Successfully executed post-deployment tasks'
      })
    })
    .catch(callback)
}
