/* eslint-disable no-unused-vars */
const lansingJavascriptMeetupGroupId = 14621542;
const midMichiganAgileGroupId = 1708426;
const groupIds = [lansingJavascriptMeetupGroupId, midMichiganAgileGroupId];

class Service {
  constructor(options, meetupProvider) {
    this.options = options || {};
    this.meetupProvider = meetupProvider;
  }

  async find(params) {
    const meetupGroupPromises = groupIds.map(groupId => this.meetupProvider.getEvents({group_id: groupId}));
    return Promise.all(meetupGroupPromises); // TODO: flatten
  }

  async get(id, params) {
    // return await this.meetupProvider.getEvent({
    //   urlname: midMichiganAgileGroupId,
    //   id: id
    // });
  }
}

module.exports = function (options, meetupProvider) {
  return new Service(options, meetupProvider);
};

module.exports.Service = Service;
