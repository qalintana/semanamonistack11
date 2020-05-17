const routes = require('express').Router();

const OngController = require('./Controllers/OngController');




routes.get('/ongs', OngController.index);
routes.post('/ongs', OngController.create);

module.exports = routes;
