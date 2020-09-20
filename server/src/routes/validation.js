const { body, validationResult } = require('express-validator');
const moment = require('moment');
require('moment-timezone');

module.exports = {
  requiredFieldsPost: [
    body('nome')
      .trim()
      .notEmpty()
      .withMessage('O campo nome não pode estar vazio.'),
    body('preco')
      .notEmpty()
      .withMessage('O campo preço não pode estar vazio.')
      .isFloat({ min: 1 })
      .withMessage('O preço deve ser maior que R$ 1,00.'),
    body('validade')
      .notEmpty()
      .withMessage('A validade não pode estar vazia.')
      .isDate()
      .withMessage('Insira um formato de data válido.')
      .bail()
      .custom(value => {
        const validade = moment.tz(value, 'America/Recife');
        const today = moment.now();
        return validade.isAfter(today);
      })
      .withMessage('A validade deve ser posterior a data de hoje.'),
  ],
  
  requiredFieldsPatch: [
    body('nome')
      .optional()
      .trim()
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
      .isDate()
      .withMessage('Insira um formato de data válido.')
      .bail()
      .custom(value => {
        const validade = moment.tz(value, 'America/Recife');
        const today = moment.now();
        return validade.isAfter(today);
      })
      .withMessage('A validade deve ser posterior a data de hoje.'),
  ],
  
  async returnValidation (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
};
