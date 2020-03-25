const db = require('../database')

class Incidents {
  async listIncidents (page) {
    try {
      const incidents = await db('incidents')
        .select([
          'incidents.*',
          'ongs.name',
          'ongs.email',
          'ongs.whatsapp',
          'ongs.city',
          'ongs.uf'
        ])
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)

      return incidents
    } catch (err) {
      console.log(err)
    }
  }

  async countIncidents () {
    try {
      const [count] = await db('incidents').count()

      return count
    } catch (err) {
      return { error: err }
    }
  }

  async listOngIncidents (ongId) {
    const incidents = await db('incidents')
      .where('ong_id', ongId)
      .select('*')

    return incidents
  }

  async createIncident (title, description, value, ongId) {
    try {
      const [id] = await db('incidents').insert({
        title,
        description,
        value,
        ong_id: ongId
      })

      return { id }
    } catch (err) {
      return { error: err }
    }
  }

  async deleteIncident (id, ongId) {
    try {
      const incident = await db('incidents')
        .where('id', id)
        .select('ong_id')
        .select('title')
        .first()

      if (!incident) {
        return {
          status: 400,
          msg: { error: 'Caso informado não foi encontrado.' }
        }
      }

      if (incident.ong_id !== ongId) {
        return {
          status: 401,
          msg: { error: 'Você não pode alterar casos de outra ONG.' }
        }
      }

      await db('incidents')
        .where('id', id)
        .delete()

      return {
        status: 200,
        msg: { success: `O caso ${incident.title} foi excluído com sucesso!` }
      }
    } catch (err) {
      return { error: err }
    }
  }
}

module.exports = new Incidents()
