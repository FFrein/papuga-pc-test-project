const {Schema, model} = require('mongoose');
const cpuModel = require('./cpu-model');
const motherboardModel = require('./motherboard-model');
const gpuModel = require('./gpu-model');

const PCSchema = new Schema({
    Author:{type:Schema.Types.ObjectId, required: true, ref: 'User'},
    Name:{type:String, unique:true, required: true},
    Motherboard:{type:String, required: true},
    CPU:{type:String, required: true},
    GPU:{type:String, required: true},
    RAM_SIZE:{type:Number,required: true},
    RAM_Quantity:{type:Number,required: true},
    Published:{type:Boolean,required: true},
})


PCSchema.pre('save', async function(next) {
    try {
        // Проверяем, существует ли объект с указанным полем
        const cpu = await cpuModel.findOne({ Name: this.CPU });
        if (!cpu) {
            throw new Error('CPU с указанным name не найден');
        }
        // Проверяем, существует ли объект с указанным полем
        const gpu = await gpuModel.findOne({ Name: this.GPU });
        if (!gpu) {
            throw new Error('GPU с указанным name не найден');
        }
        // Проверяем, существует ли объект с указанным полем
        const mthrbrd = await motherboardModel.findOne({ Name: this.Motherboard });
        if (!mthrbrd) {
            throw new Error('Motherboard с указанным name не найден');
        }
        next(); // Продолжаем сохранение
    } catch (error) {
        next(error); // Передаем ошибку дальше
    }
});

module.exports = model("PC", PCSchema)