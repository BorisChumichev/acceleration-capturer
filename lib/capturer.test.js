import test from 'ava'
import capturer from './capturer'

const windowMock =
  {
  }

test('foo', t => {
  capturer(windowMock)
  t.pass()
})
