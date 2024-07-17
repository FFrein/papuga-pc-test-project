const {Schema, model} = require('mongoose');

const GPUSchema = new Schema({
    Name:{type:String, unique:true, required: true},
    Brand:{type:String, required: true},
    Interface:{type:String, required: true},
    CoreClock:{type:Number, required: true},
    TurboBoost:{type:Number, required: true},
    MemoryType:{type:String, required: true},
    MemorySize:{type:Number, required: true},
    BusWidth:{type:Number, required: true},
    Technology:{type:Number, required: true},
})

module.exports = model("GPU", GPUSchema)