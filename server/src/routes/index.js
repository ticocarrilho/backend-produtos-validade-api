const express = require('express');

const ProdutosController = require('../app/controllers/ProdutoController');
const {
  requiredFieldsPost,
  requiredFieldsPatch,
  returnValidation,
} = require('./validation');

const routes = express.Router();

routes.get('/api/produtos', ProdutosController.index);
routes.get('/api/produtos/:productId', ProdutosController.show);
routes.post(
  '/api/produtos',
  requiredFieldsPost,
  returnValidation,
  ProdutosController.store
);
routes.put(
  '/api/produtos/:productId',
  requiredFieldsPatch,
  returnValidation,
  ProdutosController.update
);
routes.delete('/api/produtos/:productId', ProdutosController.delete);

module.exports = routes;
