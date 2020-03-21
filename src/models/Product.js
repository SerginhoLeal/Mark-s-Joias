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
    elo:{
        type:String,
        required:false,
    },
    description:{
        type:String,
        required:false,
    },
    data:{
        type: Date,
        default:Date.now,
    },
    // likes: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Product',
    // }],
    // dislikes: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'Product',
    // }],
});

ProductSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
})

ProductSchema.plugin(mongoosePaginate);

mongoose.model('Product', ProductSchema);