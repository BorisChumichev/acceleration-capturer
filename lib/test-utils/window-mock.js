const { partial } = require('ramda')

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
      { DeviceMotionEvent: true
      , addEventListener
      , removeEventListener
      }
    )
  }
