if (process.argv.length !== 3) {
  console.error('usage: node ./dist/run [function]')
  process.exit(1)
}

const callback = (error, response) => {
  if (error) {
    console.error(error)
  } else {
    console.log(response)
  }
}

const functionName = process.argv[2]
const handler = require(`./functions/${functionName}`).handler
handler(null, null, callback)
