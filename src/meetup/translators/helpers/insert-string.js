// Inserts a value into a string at the specified index
// Example:
//   insertString('hello world', 5, ',')
//   'hello, world'

module.exports = (str, index, value) =>
  str.substr(0, index) + value + str.substr(index)
