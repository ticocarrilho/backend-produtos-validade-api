const truncate = require('../utils/truncate');
const { Produto } = require('../../src/app/models');
const produtoInfo = require('../produtoInfo');

describe('Produto', () => {
  beforeEach(async () => {
    await truncate();
  });
  
  it('should create a product successfully', async () => {
    expect(async () => await Produto.create(produtoInfo)).not.toThrow();
  })

  it('should not be able to create a product without a name', async () => {
    const { nome, ...productWithoutName } = produtoInfo;
    await expect(async () => await Produto.create(productWithoutName)).rejects.toThrow();
  })

  it('should not be able to create a product without a price', async () => {
    const { preco, ...productWithoutPrice } = produtoInfo;
    await expect(async () => await Produto.create(productWithoutPrice)).rejects.toThrow();
  })

  it('should not be able to create a product without an expiration date', async () => {
    const { validade, ...productWithoutExpDate } = produtoInfo;
    await expect(async () => await Produto.create(productWithoutExpDate)).rejects.toThrow();
  })
})