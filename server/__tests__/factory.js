const { factory } = require('factory-girl');
const { Produto } = require('../src/app/models');
const produtoInfo = require('./produtoInfo');

factory.define('Produto', Produto, produtoInfo);

module.exports = factory;
