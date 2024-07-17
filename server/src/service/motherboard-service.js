const motherboardModel = require('../models/motherboard-model');
//const ApiError = require('../exceptions/api-error');

class Motherboard {
    constructor(Name, Brand, CPU_Socket, GPU_Interface, RAM_Type, RAM, SATA, NVME) {
        this.Name = Name; // string
        this.Brand = Brand; // string
        this.CPU_Socket = CPU_Socket; // string
        this.GPU_Interface = GPU_Interface; // string
        this.RAM_Type = RAM_Type; // string
        this.RAM = RAM; // string
        this.SATA = SATA; // Number
        this.NVME = NVME; // Number
    }
}

class MotherboardService {
    async create(mthrbrdData) {
        try {
            const mthrbrd = await motherboardModel.create({...mthrbrdData});

            return mthrbrd;
        } catch (e) {
            console.error('ERROR MotherboardService create:', e);
            return null;
        }
    }

    async read() {
        try {
            const Mthrbrds = await motherboardModel.find(); 
            return Mthrbrds;
        } catch (e) {
            console.error('Error reading Motherboards:', e);
            return null;
        }
    }

    async update(Name, mthrbrdData) {
        try {
            const updatedMthrbrd = await motherboardModel.findOneAndUpdate({ Name }, mthrbrdData, { new: true }); // Находим и обновляем запись по имени
            return updatedMthrbrd;
        } catch (e) {
            console.error('Error updating Motherboard:', e);
            return null;
        }
    }

    async delete(Name) {
        try {
            console.log(Name);
            const deletedMthrbrd = await motherboardModel.findOneAndDelete({ Name }); // Находим и удаляем запись по имени
            
            return deletedMthrbrd;
        } catch (e) {
            console.error('Error deleting Motherboard:', e);
            return null;
        }
    }
}

module.exports = { MotherboardService, Motherboard };
