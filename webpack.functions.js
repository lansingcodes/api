const nodeExternals = require('webpack-node-externals')

// webpack-node-externals is needed to build firebase-admin into the
// netlify-lambda functions. Otherwise all functions using firebase-admin
// will fail with the message "TypeError [ERR_INVALID_ARG_TYPE]".
module.exports = {
  externals: [nodeExternals()]
}
