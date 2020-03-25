const crypto = require('crypto')
const db = require('../database')

class Ongs {
  async listOngs () {
    try {
      const ongs = await db('ongs').select('*')

      return ongs
    } catch (err) {
      console.log(err)
    }
  }

  async createOng (name, email, whatsapp, city, uf) {
    const id = crypto.randomBytes(4).toString('HEX')

    try {
      await db('ongs').insert({
        id,
        name,
        email,
        whatsapp,
        city,
        uf
      })

      return { id }
    } catch (err) {
      console.log(err)
    }
  }

  async ongLogin (id) {
    try {
      const ong = await db('ongs')
        .where('id', id)
        .select('name')
        .first()

      if (!ong) {
        return {
          status: 400,
          msg: { error: 'ID informado não retornou nenhuma ONG' }
        }
      }

      return {
        status: 200,
        msg: ong
      }
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new Ongs()
