const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

class AppController {
  distPath = path.join(__dirname, '..', '..', 'dist');
  constructor() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.express.use(express.json());
    this.express.use(morgan('common'));
    if (process.env.NODE_ENV === 'development') {
      this.express.use(cors());
    }
  }

  routes() {
    this.express.use(require('./routes'));
    this.express.use(express.static(this.distPath));
  }
}

module.exports = new AppController().express;