const gpuModel = require('../models/gpu-model.js');
const ApiError = require('../exceptions/api-error');

class GPU {
    constructor(Name, Brand, Interface, CoreClock, TurboBoost, MemoryType, MemorySize, BusWidth, Technology) {
        this.Name = Name; // string
        this.Brand = Brand; // string
        this.Interface = Interface; // string
        this.CoreClock = CoreClock; // Number
        this.TurboBoost = TurboBoost; // Number
        this.MemoryType = MemoryType; // string
        this.MemorySize = MemorySize; // Number
        this.BusWidth = BusWidth; // Number
        this.Technology = Technology; // Number
    }
}

class GPUService {
    async create(gpuData) {
        try {
            //console.log(gpuData)
            const gpu = await gpuModel.create({...gpuData});

            return gpu;
        } catch (e) {
            console.error('ERROR GPUService create:', e);
            return null;
        }
    }

    async read() {
        try {
            const gpus = await gpuModel.find(); 
            return gpus;
        } catch (e) {
            console.error('Error reading GPUs:', e);
            return null;
        }
    }

    async update(Name, gpuData) {
        try {
            const updatedGpu = await gpuModel.findOneAndUpdate({ Name }, gpuData, { new: true }); // Находим и обновляем запись по имени
            return updatedGpu;
        } catch (e) {
            console.error('Error updating GPU:', e);
            return null;
        }
    }

    async delete(Name) {
        try {
            console.log(Name);
            const deletedGpu = await gpuModel.findOneAndDelete({ Name }); // Находим и удаляем запись по имени
            
            return deletedGpu;
        } catch (e) {
            console.error('Error deleting GPU:', e);
            return null;
        }
    }
}

module.exports = { GPUService, GPU };
