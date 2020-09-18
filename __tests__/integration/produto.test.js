const request = require('supertest');

const app = require('../../src/app');
const truncate = require('../utils/truncate');
const factory = require('../factory');
const produtoInfo = require('../produtoInfo');

beforeEach(async () => {
  await truncate();
});

describe('GET /api/produtos', () => {
  it('should be able to get all products', async () => {
    const productsAmount = 10;
    await factory.createMany('Produto', productsAmount);
    const response = await request(app).get('/api/produtos');
    expect(response.body).toHaveLength(productsAmount);
  });
});

describe('GET /api/produtos/:productId', () => {
  it('should be able to get an existing product by id', async () => {
    const product = await factory.create('Produto');
    const response = await request(app).get(`/api/produtos/${product.id}`);
    expect(response.body.nome).toBe(product.nome);
  });

  it('should return 404 when trying to get a product that does not exists', async () => {
    const product = await factory.create('Produto');
    const response = await request(app).get(`/api/produtos/${product.id + 1}`);
    expect(response.status).toBe(404);
  });
});

describe('POST /api/produtos', () => {
  it('should be able to post a product', async () => {
    const response = await request(app).post('/api/produtos').send(produtoInfo);
    expect(response.status).toBe(200);
  });

  it('should return 400 when trying to post a product without a required field', async () => {
    const { nome, ...productWithoutName } = produtoInfo;
    const response = await request(app)
      .post('/api/produtos')
      .send(productWithoutName);
    expect(response.status).toBe(400);
  });

  it('should return 400 when trying to post a product with a empty required field', async () => {
    const response = await request(app)
      .post('/api/produtos')
      .send({ ...produtoInfo, nome: '' });
    expect(response.status).toBe(400);
  });
});

describe('PUT /api/produtos', () => {
  it('should be able to update a existing product', async () => {
    const product = await factory.create('Produto');
    const nome = 'Ketchup';
    const response = await request(app)
      .patch(`/api/produtos/${product.id}`)
      .send({ nome });
    expect(response.body.nome).toBe(nome);
  });

  it('should return 404 when trying to update a product that does not exists', async () => {
    const product = await factory.create('Produto');
    const response = await request(app)
      .patch(`/api/produtos/${product.id + 1}`)
      .send({ nome: 'Ketchup' });
    expect(response.status).toBe(404);
  });

  it('should return 400 when trying to update a product without a required field', async () => {
    const product = await factory.create('Produto');
    const response = await request(app)
      .patch(`/api/produtos/${product.id}`)
      .send({ nome: '' });
    expect(response.status).toBe(400);
  });
});

describe('DELETE /api/produtos/:id', () => {
  it('should be able to delete an existing product by id', async () => {
    const product = await factory.create('Produto');
    const response = await request(app).delete(`/api/patients/${product.id}`);
    expect(response.status).toBe(204);
  });

  it('should return 404 when trying to update a non-existing patient', async () => {
    const product = await factory.create('Produto');
    const response = await request(app).delete(
      `/api/patients/${product.id + 1}`
    );
    expect(response.status).toBe(404);
  });
});
