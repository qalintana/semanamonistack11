const crypto = require('crypto');
const knex = require('../database/connection');

module.exports = {
  async index(req, res) {
    const ongs = await knex('ongs').select('*');
    return res.json(ongs);
  },

  async create(req, res) {
    const { name, email, whatsapp, city, uf } = req.body;

    const id = crypto.randomBytes(4).toString('HEX');

    await knex('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf,
    });

    return res.json(id);
  },
};
