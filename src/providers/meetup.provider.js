/**
 * Wrapper which provides select meetup-api methods as Promises.
 *
 * @see {@link https://github.com/jkutianski/meetup-api}
 * @param meetupApi A configured instance of the meetup-api.
 * @returns {{getEvents: (function(*=)), getEvent: (function(*=))}}
 */
module.exports = function (meetupApi) {

  /**
   * Calls the given Meetup API library method and wraps its response in a Promise.
   *
   * @param method The Meetup API library method to be called.
   * @param parameters The parameters object to be passed to the given method.
   * @returns {Promise} A Promise representing either the results of the call or the error message.
   */
  function callApi(method, parameters) {
    return new Promise((resolve, reject) => {
      method.call(
        this,
        parameters,
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  }

  return {
    getEvents: params => callApi(meetupApi.getEvents, params),
    getEvent: params => callApi(meetupApi.getEvent, params)
  };
};
