const express = require('express');

const routes = express.Router();

const ProductController = require('./controllers/ProductController');

routes.post('/login', ProductController.login);
routes.post('/register', ProductController.store);
routes.get('/all', ProductController.index);
routes.get('/read/:id', ProductController.show);
routes.get('/read_name/:nome', ProductController.show2);
routes.put('/update/:id', ProductController.update);
routes.delete('/delete/:id', ProductController.destroy);

module.exports = routes;