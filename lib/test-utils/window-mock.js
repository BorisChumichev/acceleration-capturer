const { partial } = require('ramda')
const documentMock = require('./document-mock')

module.exports = () => {
    let interval

    const accelerationEventMock = {
        acceleration:
          { x: 0
          , y: 0
          , z: 0
          }
      }

    const addEventListener = (eventName, handler) => 
      interval = setInterval(
          () => handler(accelerationEventMock), 50
        )

    const removeEventListener = partial(clearInterval, [ interval ])

    return (
      { document: documentMock
      , DeviceMotionEvent: true
      , addEventListener
      , removeEventListener
      }
    )
  }
