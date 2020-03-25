const Ongs = require('../models/Ongs')

class SessionController {
  async store (req, res) {
    const { id } = req.body

    const ong = await Ongs.ongLogin(id)

    return res.status(ong.status).json(ong.msg)
  }
}

module.exports = new SessionController()
