const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    email:{type:String, unique:true, required: true},
    password:{type:String, required: true},
    role:{type:String, required:true},
    isActivated:{type:Boolean, default:false},
    activationLink:{type:String},
    banned:{type:Boolean, default:false}
})

module.exports = model("User", UserSchema)