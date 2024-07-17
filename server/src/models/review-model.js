const {Schema, model} = require('mongoose');

const ReviewSchema = new Schema({
    Text:{type:String, required:true},
    Author:{type:Schema.Types.ObjectId, ref: 'User', required:true},
    PC:{type:Schema.Types.ObjectId, ref: 'PC', required:true}
})

module.exports = model("Review", ReviewSchema)