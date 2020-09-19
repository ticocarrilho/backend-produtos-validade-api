module.exports = (sequelize, DataTypes) => {
  const Produto = sequelize.define('Produto', {
    nome: DataTypes.STRING,
    preco: DataTypes.DECIMAL,
    validade: DataTypes.DATEONLY
  });
  return Produto;
};
