module.exports = (emitter, callback) => {
  if (!emitter['DeviceMotionEvent'])
    return callback(new Error('DeviceMotionEvent is not supported'))

  let timeout
  const stack = []

  const complete = () => {
      callback(null, stack)
    }

  const collect = event => {
      if (!timeout) setTimeout(complete, 5e3)
      stack.push(event.acceleration)
    }

  emitter.addEventListener('devicemotion', collect)
}
