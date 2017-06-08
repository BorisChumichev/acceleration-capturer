import test from 'ava'
import capturer from './capturer'
import { promisify } from 'bluebird'
import { partial, omit, pluck } from 'ramda'

const windowMock = () => {
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
          () => handler(accelerationEventMock), 60
        )

    const removeEventListener = partial(clearInterval, [ interval ])

    return (
      { DeviceMotionEvent: true
      , addEventListener
      , removeEventListener
      }
    )
  }

test('Fires an error if DeviceMotionEvent is not supported', t =>
  capturer({}, err =>
    err ? t.pass() : t.fail()
  )
)

test('Captures acceleration values for time period', async t => {
  const result = await promisify(capturer)(windowMock())
    , arbitraryResultPoint = result[42]

  t.deepEqual(
    omit(['t'], arbitraryResultPoint), { x: 0, y: 0, z: 0 }
  )

  t.is(true, arbitraryResultPoint.t < 5e3 && arbitraryResultPoint.t > 1)
})
