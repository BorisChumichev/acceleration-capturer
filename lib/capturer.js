module.exports = (emitter, callback) => {
  if (!emitter['DeviceMotionEvent'])
    return callback(new Error('DeviceMotionEvent is not supported'))

  let startedAt
  const stack = []

  const start = () => {
    startedAt = + new Date()
    setTimeout(complete, 5e3)
  }

  const complete = () =>
    callback(null, stack)

  const collect = event => {
      if (!startedAt) start()

      const { x, y, z } = event.acceleration
        , t = + new Date() - startedAt

      stack.push({ t, x, y, z })
    }

  emitter.addEventListener('devicemotion', collect)
}
