const { compressToEncodedURIComponent } = require('lz-string')

const round = num => Math.round(num * 1e3) / 1e3

const serializeEvent = ({ t, x, y, z }) =>
  `${t},${round(x)},${round(y)},${round(z)}`

module.exports = events =>
  compressToEncodedURIComponent(
    events.map(serializeEvent).join(',')
  )
