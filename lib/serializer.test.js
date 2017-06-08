import test from 'ava'
import { promisify } from 'bluebird'
import { compressToEncodedURIComponent } from 'lz-string'
import serialize from './serializer'

const eventsMock =
  [ { t: 0, x: 1, y: 2, z: 3 }
  , { t: 4, x: 5, y: 6, z: 7 }
  ]

test('Serializes event data', t =>
  t.is(
    'AwGgjCBMIMwgLCArCAbCA7EA',
    serialize(eventsMock)
  )
)
