const knex = require('knex')
const configuration = require('../../knexfile')

const db = knex(configuration.development)

module.exports = db
