const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

const Product = mongoose.model('Product');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
    });
}

module.exports = {
    async index(req, res){
        const {page = 1} = req.query;
        const products = await Product.paginate({},{page, limit:10});
        return res.json(products);
    },

    async login(req, res){
        const {email, password} = req.body;

        const user = await Product.findOne({email}).select('+password');
        
        if(!user)
            return res.status(400).send({error:'Email inexistente'});
        
        if(!await bcrypt.compare(password, user.password))
            return res.status(400).send({error:'Senha invalida'});
        
        user.password = undefined;

        res.send({
            user,
            token:generateToken({id:user.id}),
        });
    },

    async store(req, res){
        const {nome,email} = req.body;
        // const desc = descript.split(',').map(no => no.trim());
    try{
        if(await Product.findOne({email}))//se encontrar um email o cadastro não será realizado
            return res.status(400).send({error:'Email já em uso!'});
        
        if(await Product.findOne({nome}))//se encontrar um email o cadastro não será realizado
            return res.status(400).send({error:'Nome já em uso!'});

        const user = await Product.create(req.body);

        user.password = undefined;
        return res.send({
            user,
            token:generateToken({id:user.id}),
        });
        }catch(err){
            return res.statusCode(400).send({error:'fail'});
        }
    },

    async show(req, res){
        const product = await Product.findById(req.params.id);
        return res.json(product);
    },

    async update(req, res){
        const user = await Product.findByIdAndUpdate(req.params.id, req.body, {new:true});
        user.password = undefined;

        return res.json(user);
    },

    async destroy(req,res){
        await Product.findByIdAndRemove(req.params.id);
        return res.send();
    },

};