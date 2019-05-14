'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API:'"/api"',//'"http://127.0.0.1:7575"'
  USER_API:'"http://10.215.136.245:11200/"'
})
