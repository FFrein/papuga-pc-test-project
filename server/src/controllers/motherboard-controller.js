const {MotherboardService, Motherboard} = require('../service/motherboard-service');
const mthrbrdService = new MotherboardService();

class MotherboardController{

    async createMotherboard(req, res, next){
        try{
            const {Name, Brand, CPU_Socket, GPU_Interface, RAM_Type, RAM, SATA, NVME} = req.body;
            //Валидация полей?
            const newMotherboard = await mthrbrdService.create(new Motherboard(Name, Brand, CPU_Socket, GPU_Interface, RAM_Type, RAM, SATA, NVME));

            return res.json(newMotherboard);
        }
        catch(e){
            next(e);
        }
    }

    async getMotherboards(req, res, next){
        try{
            const Motherboards = await mthrbrdService.read();
            return res.json(Motherboards);
        }
        catch(e){
            next(e);
        }
    }

    async updateMotherboard(req, res, next){
        try{
            const {Name,newName, Brand, CPU_Socket, GPU_Interface, RAM_Type, RAM, SATA, NVME} = req.body;
            
            const updateMotherboard = await mthrbrdService.update(Name, new Motherboard(newName, Brand, CPU_Socket, GPU_Interface, RAM_Type, RAM, SATA, NVME));

            return res.json(updateMotherboard);
        }
        catch(e){
            next(e);
        }
    }

    async deleteMotherboard(req, res, next){
        try{
            const {Name} = req.params;

            const delMotherboard = await mthrbrdService.delete(Name);

            return res.json(delMotherboard);
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = new MotherboardController();