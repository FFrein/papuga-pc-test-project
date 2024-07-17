const PCModel = require('../models/pc-model.js');
const ApiError = require('../exceptions/api-error');

class PC {
    constructor(Author, Name,Motherboard,CPU,GPU,RAM_SIZE,RAM_Quantity,Published) {
        this.Author = Author; //ObjectId
        this.Name = Name; // string
        this.Motherboard = Motherboard; // 
        this.CPU = CPU; // 
        this.GPU = GPU; // 
        this.RAM_SIZE = RAM_SIZE; // Number
        this.RAM_Quantity = RAM_Quantity; // string
        this.Published = Published; // Number
    }
}

class PCService {
    async create(PCData) {
        try {
            //console.log(PCData)
            const PC = await PCModel.create({...PCData});

            return PC;
        } catch (e) {
            console.error('ERROR PCService create:', e);
            return null;
        }
    }

    async read() {
        try {
            const PCs = await PCModel.find(); 
            return PCs;
        } catch (e) {
            console.error('Error reading PCs:', e);
            return null;
        }
    }

    async readPublishedPCs() {
        try {
            const PCs = await PCModel.find({ Published: true }); 
            return PCs;
        } catch (e) {
            console.error('Error readPublishedPCs:', e);
            return null;
        }
    }

    async readCurrentPC(_id) {
        try {
            const PCs = await PCModel.findById(_id); 
            return PCs;
        } catch (e) {
            console.error('Error readCurrentPC:', e);
            return null;
        }
    }
    
    async readUserPC(Author) {
        try {
            const PCs = await PCModel.find({ Author: Author }); 
            return PCs;
        } catch (e) {
            console.error('Error readUserPC:', e);
            return null;
        }
    }

    async update(_id, PCData) {
        try {
            const updatedPC = await PCModel.findOneAndUpdate({ _id }, PCData, { new: true }); // Находим и обновляем запись по имени
            return updatedPC;
        } catch (e) {
            console.error('Error updating PC:', e);
            return null;
        }
    }

    async delete(_id) {
        try {
            console.log(_id);
            const deletedPC = await PCModel.findOneAndDelete({ _id }); // Находим и удаляем запись по имени
            
            return deletedPC;
        } catch (e) {
            console.error('Error deleting PC:', e);
            return null;
        }
    }
}

module.exports = { PCService, PC };
