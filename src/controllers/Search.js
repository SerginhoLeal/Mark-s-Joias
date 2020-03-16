const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res){
        const {nome} = req.query;

        const nome_usuario = nome.split(',').map(no => no.trim());

        const usuarios = await Product.find({
            nome:{
                $in:nome_usuario,
            },
        });

        return res.json(usuarios);
    }
}