import test from 'ava'
import serialize from './serializer'

const eventsMock =
  [ { t: 0, x: 1, y: 2, z: 3 }
  , { t: 4, x: 5, y: 6, z: 7 }
  ]

test('Serializes event data', t =>
  t.is('0,1,2,3,4,5,6,7', serialize(eventsMock))
)
