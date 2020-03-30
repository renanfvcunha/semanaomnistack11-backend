const express = require('express')
const cors = require('cors')
const routes = require('./routes')
const { errors } = require('celebrate')

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
    this.server.use(errors())
  }
}

module.exports = new App().server
