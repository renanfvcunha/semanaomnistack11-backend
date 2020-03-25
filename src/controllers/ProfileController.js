const Incidents = require('../models/Incidents')

class ProfileController {
  async index (req, res) {
    const ongId = req.headers.authorization

    const incidents = await Incidents.listOngIncidents(ongId)

    return res.json(incidents)
  }
}

module.exports = new ProfileController()
