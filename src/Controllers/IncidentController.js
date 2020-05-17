const knex = require('../database/connection');

module.exports = {
  async index(req, res) {
    const { page = 1 } = req.query;

    const incidents = await knex('incidents')
      .join('ongs', 'ongs.id', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(
        'incidents.title',
        'incidents.description',
        'incidents.value',
        'ongs.name',
        'ongs.whatsapp',
        'ongs.email'
      );

    const [count] = await knex('incidents').count('*');
    res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  },
  async create(req, res) {
    const { title, description, value } = req.body;
    console.log(req.headers.authorization);
    const ong_id = req.headers.authorization;

    const [id] = await knex('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });
    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await knex('incidents')
      .where('id', id)
      .select('ong_id ')
      .first();

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permitted' });
    }
    await knex('incidents').where('id', id).del();

    return res.status(204).send();
  },
};
