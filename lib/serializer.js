const { compressToEncodedURIComponent } = require('lz-string')

const serializeEvent = ({ t, x, y, z }) =>
  `${t},${x},${y},${z}`

module.exports = events =>
  compressToEncodedURIComponent(
    events.map(serializeEvent).join(',')
  )
