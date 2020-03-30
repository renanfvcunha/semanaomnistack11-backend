const { Router } = require('express')
const { celebrate, Segments, Joi } = require('celebrate')
const SessionsController = require('./controllers/SessionsController')
const OngsController = require('./controllers/OngsController')
const ProfileController = require('./controllers/ProfileController')
const IncidentsController = require('./controllers/IncidentsController')

const routes = Router()

routes.post('/sessions', SessionsController.store)

routes.get('/ongs', OngsController.index)
routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string()
        .required()
        .email(),
      whatsapp: Joi.number()
        .required()
        .min(10)
        .max(11),
      city: Joi.string().required(),
      uf: Joi.string()
        .required()
        .length(2)
    })
  }),
  OngsController.store
)

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required()
    }).unknown()
  }),
  ProfileController.index
)

routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number()
    })
  }),
  IncidentsController.index
)
routes.post(
  '/incidents',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required()
    })
  }),
  IncidentsController.store
)
routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required()
    })
  }),
  IncidentsController.destroy
)

module.exports = routes
