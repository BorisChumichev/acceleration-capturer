const superagent = require('superagent')

module.exports = {
    createElement() {
      return {
        set src(remote) {
          superagent
            .get(remote)
            .end()
        }
      }
    }
  }
