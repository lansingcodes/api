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
    const meetupGroupPromises = groupIds.map(groupId =>
      this.meetupProvider.getEvents({ group_id: groupId })
    );
    const results = await Promise.all(meetupGroupPromises);
    const flattened = results.reduce(
      (acc, curr) => [...acc, ...curr.results],
      []
    );
    return flattened;
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
