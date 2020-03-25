const Incidents = require('../models/Incidents')

class IncidentsController {
  async index (req, res) {
    const { page = 1 } = req.query

    const incidents = await Incidents.listIncidents(page)
    const count = await Incidents.countIncidents()

    res.header('X-Total-Count', count['count(*)'])
    return res.json(incidents)
  }

  async store (req, res) {
    const { title, description, value } = req.body
    const ongId = req.headers.authorization

    const id = await Incidents.createIncident(title, description, value, ongId)

    return res.json(id)
  }

  async destroy (req, res) {
    const { id } = req.params
    const ongId = req.headers.authorization

    const response = await Incidents.deleteIncident(id, ongId)

    return res.status(response.status).json(response.msg)
  }
}

module.exports = new IncidentsController()
