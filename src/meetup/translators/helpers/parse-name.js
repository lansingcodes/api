// Meetup names can sometimes contain superfluous escape characters:
//
//   Selling DevOps\, with Garrin Ball
//
// This function attempts to remove those extra characters:
//
//   Selling DevOps, with Garrin Ball

module.exports = (name) => name.replace(/\\/g, '')
