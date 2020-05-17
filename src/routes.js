const routes = require('express').Router();

const OngController = require('./Controllers/OngController');
const IncidentController = require('./Controllers/IncidentController');




routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

routes.post('/incidents', IncidentController.create);

module.exports = routes;
