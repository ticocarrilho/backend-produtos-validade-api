const faker = require('faker/locale/pt_BR');

module.exports = {
  nome: faker.commerce.productName(),
  preco: faker.finance.amount(),
  validade: faker.date.future(Math.floor(Math.random() * 5))
};
