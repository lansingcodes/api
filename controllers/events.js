const eventsController = {
  list: function (req, res) {
    res.send([
      {
        "name": "Event 1",
        "description": "This is a very real event. Really."
      },
      {
        "name": "Event 2",
        "description": "This is another very real event. I wouldn't lie to you."
      }
    ]);
  },
  search: function (req, res) {
    res.send([
      {
        "name": "Search Result Event 1",
        "description": "This description contains the keyword '" + req.params.query + "'!"
      }
    ]);
  }
};

module.exports = eventsController;
