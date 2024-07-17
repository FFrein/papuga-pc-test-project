const {Schema, model} = require('mongoose');

const MotherboardSchema = new Schema({
    Name:{type:String, unique:true, required: true},
    Brand:{type:String, required: true},
    CPU_Socket:{type:String, required: true},
    GPU_Interface:{type:String, required: true},
    RAM_Type:{type:String, required: true},
    RAM:{type:Number, required: true},
    SATA:{type:Number, required: true},
    NVME:{type:Number, required: true},
})

module.exports = model("Motherboard", MotherboardSchema)