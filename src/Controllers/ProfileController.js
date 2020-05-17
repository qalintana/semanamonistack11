const knex = require('../database/connection');

module.exports = {
  async index(req, res) {
    const ong_id = req.headers.authorization;

    const incidents = await knex('incidents')
      .where('ong_id', ong_id)
      .join('ongs', 'ongs.id', 'incidents.ong_id')
      .select('title', 'description', 'value', 'ongs.name');

    return res.json(incidents);
  },
};
