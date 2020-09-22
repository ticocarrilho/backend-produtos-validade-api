const { body, validationResult } = require('express-validator');
const moment = require('moment');
require('moment-timezone');

const NOME_EMPTY = 'O campo nome não pode estar vazio.';
const PRECO_EMPTY = 'O campo preço não pode estar vazio.';
const PRECO_MIN = 'O preço deve ser maior que R$ 1,00.';
const DATE_EMPTY = 'A validade não pode estar vazia.';
const DATE_INVALID_FORMAT = 'Insira um formato de data válido.';
const DATE_MIN = 'A data de validade deve ser posterior a data de hoje.';

module.exports = {
  requiredFieldsPost: [
    body('nome').trim().notEmpty().withMessage(NOME_EMPTY),
    body('preco')
      .notEmpty()
      .withMessage(PRECO_EMPTY)
      .isFloat({ min: 1 })
      .withMessage(PRECO_MIN),
    body('validade')
      .notEmpty()
      .withMessage(DATE_EMPTY)
      .bail()
      .custom((value) => {
        return moment(value).isValid();
      })
      .withMessage(DATE_INVALID_FORMAT)
      .bail()
      .custom((value) => {
        const validade = moment.tz(value, 'America/Recife');
        const today = moment.now();
        return validade.isAfter(today);
      })
      .withMessage(DATE_MIN),
  ],

  requiredFieldsPatch: [
    body('nome').optional().trim().notEmpty().withMessage(NOME_EMPTY),
    body('preco')
      .optional()
      .notEmpty()
      .withMessage(PRECO_EMPTY)
      .isFloat({ min: 1 })
      .withMessage(PRECO_MIN),
    body('validade')
      .optional()
      .notEmpty()
      .withMessage(DATE_EMPTY)
      .bail()
      .custom((value) => {
        return moment(value).isValid();
      })
      .withMessage(DATE_INVALID_FORMAT)
      .bail()
      .custom((value) => {
        const validade = moment.tz(value, 'America/Recife');
        const today = moment.now();
        return validade.isAfter(today);
      })
      .withMessage(DATE_MIN),
  ],

  async returnValidation(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
};
