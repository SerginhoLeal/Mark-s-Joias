const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res){
        const {description} = req.query;

        const description = description.split(',').map(no => no.trim());

        const usuarios = await Product.find({
            description:{
                $in:description,
            },
        });

        return res.json(usuarios);
    }
}