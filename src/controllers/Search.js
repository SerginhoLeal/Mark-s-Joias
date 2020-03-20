const mongoose = require('mongoose');

const Product = mongoose.model('Product');

module.exports = {
    async index(req, res){
        const {descript} = req.query;

        const desc = descript.split(',').map(no => no.trim());

        const usuarios = await Product.find({
            description:{
                $in:desc,
            },
        });

        return res.json(usuarios);
    }
}