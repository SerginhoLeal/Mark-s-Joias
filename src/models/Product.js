const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const ProductSchema = new mongoose.Schema({
    nome:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
});

ProductSchema.plugin(mongoosePaginate);

mongoose.model('Product', ProductSchema);