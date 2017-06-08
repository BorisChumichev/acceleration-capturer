const serializeEvent = ({ t, x, y, z }) =>
  `${t},${x},${y},${z}`

module.exports = events =>
  events.map(serializeEvent).join(',')
