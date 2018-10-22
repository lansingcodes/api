// Initializes the `events` service on path `/events`
const createService = require('./events.class');
const meetupProvider = require('./../../providers/meetup.provider');
const meetupApi = require('meetup-api');
const hooks = require('./events.hooks');

module.exports = function(app) {
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use(
    '/events',
    createService(
      options,
      meetupProvider(
        meetupApi({
          key: process.env.MEETUP_API_KEY // Set MEETUP_API_KEY in your environment
        })
      )
    )
  );

  // Get our initialized service so that we can register hooks
  const service = app.service('events');

  service.hooks(hooks);
};
