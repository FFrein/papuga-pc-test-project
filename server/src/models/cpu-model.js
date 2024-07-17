const {Schema, model} = require('mongoose');

const CPUSchema = new Schema({
    Name:{type:String, unique:true, required: true},
    Brand:{type:String, required: true},
    Socket:{type:String, required: true},
    Cores:{type:Number, required: true},
    Threads:{type:Number, required: true},
    CoreClock:{type:Number, required: true},
    TurboBoost:{type:Number, required: true},
})

module.exports = model("CPU", CPUSchema)