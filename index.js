const capture = require('./lib/capturer')
  , serialize = require('./lib/serializer')
  , errorEndpoint = process.env['ENDPOINT_ERROR']
  , dataEndpoint = process.env['ENDPOINT_DATA']

const sendError = (emitter, err) => {
  const remote = errorEndpoint.replace('%placeholder%', encodeURIComponent(err.message))
  emitter.document.createElement('img').src = remote
}

const sendCapturedData = (emitter, data) => {
  let serializedMessage

  try {
    serializedMessage = serialize(data)
  } catch (error) {
    sendError(emitter, error)
  }

  const remote = dataEndpoint.replace('%placeholder%', serializedMessage)
  emitter.document.createElement('img').src = remote
}

module.exports = emitter => {
  try {
    capture(emitter, (error, result) =>
      error
        ? sendError(emitter, error)
        : sendCapturedData(emitter, result)
    )
  } catch (error) {
    sendError(emitter, error)
  }
}
