require('dotenv').config();

module.exports = {
  development: {
    username: 'root',
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.DB_NAME,
    host: 'database',
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  test: {
    storage: './__tests__/database.sqlite',
    dialect: 'sqlite',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  },
  production: {
    use_env_variable: 'CLEARDB_DATABASE_URL',
    database: process.env.DB_NAME,
    dialect: 'mysql',
    logging: false,
    define: {
      timestamps: true,
      underscored: true,
    },
  },
};
