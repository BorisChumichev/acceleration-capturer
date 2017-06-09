import test from 'ava'
import capturer from './capturer'
import { promisify } from 'bluebird'
import { omit, pluck } from 'ramda'
import windowMock from './test-utils/window-mock'

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
