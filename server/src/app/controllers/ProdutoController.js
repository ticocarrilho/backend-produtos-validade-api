const { Produto } = require('../models');

module.exports = {
  async index(req, res) {
    const products = await Produto.findAll({ raw: true });
    return res.json(products.map(({ createdAt, updatedAt, ...product}) => product));
  },
  async show(req, res) {
    const { productId } = req.params;
    const product = await Produto.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    const { id, nome, preco, validade } = product;
    res.json({ id, nome, preco, validade });
  },
  async store(req, res) {
    const { nome, preco, validade } = req.body;
    try {
      const { createdAt, updatedAt, ...product } = (
        await Produto.create({ nome, preco, validade })
      ).toJSON();

      res.json({ ...product });
    } catch (error) {
      res
        .status(400)
        .json({ message: 'Não foi possível adicionar o produto.' });
    }
  },
  async update(req, res) {
    const { productId } = req.params;
    const product = await Produto.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    try {
      await product.update(req.body);
      const { createdAt, updatedAt, ...newProduct } = product.toJSON();
      res.json({ ...newProduct });
    } catch (error) {
      res.status(400).json({ message: 'Não foi possível editar o produto.' });
    }
  },
  async delete(req, res) {
    const { productId } = req.params;
    const product = await Produto.findByPk(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    try {
      await product.destroy();
      res.json({ message: 'Produto excluído com sucesso.' });
    } catch (error) {
      res.status(400).json({ message: 'Não foi possível excluir o produto.' });
    }
  },
};
