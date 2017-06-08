const Dotenv = require('dotenv-webpack')

module.exports =
  { entry: './index.js'
  , output:
    { path: require('path').resolve(__dirname, 'dist')
    , filename: 'acceleraion-capturer.bundle.js'
    }
  , module:
    { rules:
      [ { test: /\.js$/
        , use: 'babel-loader'
        }
      ]
    }
  , plugins: [
      new Dotenv({
        path: './.env'
      })
    ]
  }
