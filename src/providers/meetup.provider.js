/**
 * Wrapper which provides select meetup-api methods as Promises.
 * @param meetupApi A configured instance of the meetup-api.
 * @returns {{getEvents: (function(*=)), getEvent: (function(*=))}}
 */
module.exports = function (meetupApi) {
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
