/* eslint-disable no-unused-vars */
const { mergeGroupEvents, translateEventsForV1Format } = require('./utilities');
const lansingJavascriptMeetupGroupId = 14621542;
const midMichiganAgileGroupId = 1708426;
const groupIds = [lansingJavascriptMeetupGroupId, midMichiganAgileGroupId];

class Service {
  constructor(options, meetupProvider) {
    this.options = options || {};
    this.meetupProvider = meetupProvider;
  }

  async find(params) {
    const meetupGroupPromises = groupIds.map(groupId =>
      this.meetupProvider.getEvents({ group_id: groupId })
    );
    const resultsForAllGroups = await Promise.all(meetupGroupPromises);
    const allEvents = resultsForAllGroups.reduce(mergeGroupEvents, []);
    const v1FormatEvents = translateEventsForV1Format(allEvents);
    return v1FormatEvents;
  }

  async get(id, params) {
    // return await this.meetupProvider.getEvent({
    //   urlname: midMichiganAgileGroupId,
    //   id: id
    // });
  }
}

module.exports = function(options, meetupProvider) {
  return new Service(options, meetupProvider);
};

module.exports.Service = Service;
