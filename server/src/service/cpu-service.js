const cpuModel = require('../models/cpu-model');
const ApiError = require('../exceptions/api-error');

class CPU {
    constructor(Name, Brand, Socket, Cores, Threads, CoreClock, TurboBoost) {
        this.Name = Name; // string
        this.Brand = Brand; // string
        this.Socket = Socket; // string
        this.Cores = Cores; // Number
        this.Threads = Threads; // Number
        this.CoreClock = CoreClock; // Number
        this.TurboBoost = TurboBoost; // Number
    }
}

class CPUService {
    async create(cpuData) {
        try {
            const cpu = await cpuModel.create({...cpuData});

            return cpu;
        } catch (e) {
            console.error('ERROR CPUService create:', e.errmsg);
            return null;
        }
    }

    async read() {
        try {
            const cpus = await cpuModel.find(); 
            return cpus;
        } catch (e) {
            console.error('Error reading CPUs:', e);
            return null;
        }
    }

    async update(Name, cpuData) {
        try {
            const updatedCpu = await cpuModel.findOneAndUpdate({ Name }, cpuData, { new: true }); // Находим и обновляем запись по имени
            return updatedCpu;
        } catch (e) {
            console.error('Error updating CPU:', e);
            return null;
        }
    }

    async delete(Name) {
        try {
            console.log(Name);
            const deletedCpu = await cpuModel.findOneAndDelete({ Name }); // Находим и удаляем запись по имени
            
            return deletedCpu;
        } catch (e) {
            console.error('Error deleting CPU:', e);
            return null;
        }
    }
}

module.exports = { CPUService, CPU };
