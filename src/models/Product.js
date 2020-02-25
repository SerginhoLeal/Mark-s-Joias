const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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
        select:false,
    },
    description:{
        type:String,
        required:true,
    },
    data:{
        type: Date,
        default:Date.now,
    }
});

ProductSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

ProductSchema.plugin(mongoosePaginate);

mongoose.model('Product', ProductSchema);