const express = require('express')
const cors = require('cors')
const routes = require('./routes')

class App {
  constructor () {
    this.init()
    this.middlewares()
    this.routes()
  }

  init () {
    this.server = express()
  }

  middlewares () {
    this.server.use(cors())
    this.server.use(express.json())
  }

  routes () {
    this.server.use(routes)
  }
}

module.exports = new App().server
