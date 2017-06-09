import test from 'ava'
import micro from 'micro'
import bb from 'bluebird'
import { split, splitEvery, omit
       , compose, takeLast, map } from 'ramda'
import { decompressFromEncodedURIComponent } from 'lz-string'
import windowMock from './lib/test-utils/window-mock'

process.env['ENDPOINT_DATA'] = 'http://localhost:3000/data/%placeholder%'
process.env['ENDPOINT_ERROR'] = 'http://localhost:3001/error/%placeholder%'

const runCapturing = require('./index.js')

const deserializeRequestData = compose(
    splitEvery(4),
    map(parseFloat),
    split(','),
    decompressFromEncodedURIComponent
  )

test('Sends dataset', t =>
  new bb((resolve, reject) => {
    micro(async (req, res) => {
      const deserializedData = deserializeRequestData(req.url.replace('/data/', ''))
        , arbitraryDataPoint = deserializedData[42]

      t.deepEqual(
        takeLast(3, arbitraryDataPoint), [0, 0, 0]
      )

      t.is(true, arbitraryDataPoint[0] < 5e3 && arbitraryDataPoint[0] > 1)

      resolve()
    }).listen(3000)

    runCapturing(windowMock())
  })
)

test('Sends an error for devices that does not support DeviceMotionEvent', t => 
  new bb((resolve, reject) => {
    micro(async (req, res) => {
      const errorMessage = decodeURIComponent(req.url.replace('/error/', ''))
      t.is('DeviceMotionEvent is not supported', errorMessage)
      resolve()
    }).listen(3001)

    runCapturing(omit(['DeviceMotionEvent'], windowMock()))
  })
)
