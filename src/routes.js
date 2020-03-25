const { Router } = require('express')
const SessionsController = require('./controllers/SessionsController')
const OngsController = require('./controllers/OngsController')
const ProfileController = require('./controllers/ProfileController')
const IncidentsController = require('./controllers/IncidentsController')

const routes = Router()

routes.post('/sessions', SessionsController.store)

routes.get('/ongs', OngsController.index)
routes.post('/ongs', OngsController.store)

routes.get('/profile', ProfileController.index)

routes.get('/incidents', IncidentsController.index)
routes.post('/incidents', IncidentsController.store)
routes.delete('/incidents/:id', IncidentsController.destroy)

module.exports = routes
