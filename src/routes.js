const express = require('express');

const routes = express.Router();

const ProductController = require('./controllers/ProductController');

routes.get('/products', ProductController.index);//pegando os dados
routes.get('/products/:id', ProductController.show);//mostrando os dados
routes.post('/products', ProductController.store);//criando/create
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

module.exports = routes;