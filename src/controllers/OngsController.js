const Ongs = require('../models/Ongs')

class OngsController {
  async index (req, res) {
    const ongs = await Ongs.listOngs()

    return res.json(ongs)
  }

  async store (req, res) {
    const { name, email, whatsapp, city, uf } = req.body

    const id = await Ongs.createOng(name, email, whatsapp, city, uf)

    return res.json(id)
  }
}

module.exports = new OngsController()
