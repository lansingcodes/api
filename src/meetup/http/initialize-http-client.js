const axios = require('axios')

module.exports = () => {
  const meetupHttpClient = axios.create({
    baseURL: 'https://www.meetup.com'
  })
  return Promise.resolve(meetupHttpClient)
}
