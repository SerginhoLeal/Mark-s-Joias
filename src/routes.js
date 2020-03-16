const express = require('express');

const routes = express.Router();

const ProductController = require('./controllers/ProductController');
const searchProduct = require('./controllers/Search');

routes.post('/login', ProductController.login);
routes.post('/register', ProductController.store);
routes.get('/all', ProductController.index);
routes.get('/read/:id', ProductController.show);
routes.put('/update/:id', ProductController.update);
routes.delete('/delete/:id', ProductController.destroy);

routes.get('/search', searchProduct.index);

module.exports = routes;