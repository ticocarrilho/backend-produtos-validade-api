const express = require('express');
const { body, validationResult } = require('express-validator');

const ProdutosController = require('./app/controllers/ProdutoController');

const routes = express.Router();

const requiredFieldsPost = [
  body('nome').notEmpty().withMessage('O campo nome não pode estar vazio.'),
  body('preco')
    .notEmpty()
    .withMessage('O campo preço não pode estar vazio.')
    .isFloat({ min: 1 })
    .withMessage('O preço deve ser maior que R$ 1,00.'),
  body('validade')
    .notEmpty()
    .withMessage('A validade não pode estar vazia.')
    .isAfter()
    .withMessage('A validade deve ser posterior a data de hoje.'),
];

const requiredFieldsPatch = [
  body('nome')
    .optional()
    .notEmpty()
    .withMessage('O campo nome não pode estar vazio.'),
  body('preco')
    .optional()
    .notEmpty()
    .withMessage('O campo preço não pode estar vazio.')
    .isFloat({ min: 1 })
    .withMessage('O preço deve ser maior que R$ 1,00.'),
  body('validade')
    .optional()
    .notEmpty()
    .withMessage('A validade não pode estar vazia.')
    .isAfter()
    .withMessage('A validade deve ser posterior a data de hoje.'),
];

const returnValidation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

routes.get('/api/produtos', ProdutosController.index);
routes.get('/api/produtos/:productId', ProdutosController.show);
routes.post(
  '/api/produtos',
  requiredFieldsPost,
  returnValidation,
  ProdutosController.store
);
routes.patch(
  '/api/produtos/:productId',
  requiredFieldsPatch,
  returnValidation,
  ProdutosController.update
);
routes.delete('/api/produtos/:productId', ProdutosController.delete);

module.exports = routes;
