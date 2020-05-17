const knex = require('../database/connection');

module.exports = {
  async create(req, res) {
    const { title, description, value } = req.body;
    console.log(req.headers.authorization)
    const ong_id = req.headers.authorization;

    const [id] = await knex('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });
    return res.json({ id });
  },
};
