const {CPUService, CPU} = require('../service/cpu-service');
const CpuService = new CPUService();

class CPUController{
    async createCPU(req, res, next){
        try{
            const {Name, Brand, Socket, Cores, Threads, CoreClock, TurboBoost} = req.body;
            //Валидация полей?
            const newCPU = await CpuService.create(new CPU(Name, Brand, Socket, Cores, Threads, CoreClock, TurboBoost));

            return res.json(newCPU);
        }
        catch(e){
            next(e);
        }
    }

    async getCPUs(req, res, next){
        try{
            const CPUs = await CpuService.read();
            return res.json(CPUs);
        }
        catch(e){
            next(e);
        }
    }

    async   updateCPU(req, res, next){
        try{
            const {NewName, Name, Brand, Socket, Cores, Threads, CoreClock, TurboBoost} = req.body;
            
            const updateCPU = await CpuService.update(Name, new CPU(NewName, Brand, Socket, Cores, Threads, CoreClock, TurboBoost));

            return res.json(updateCPU);
        }
        catch(e){
            next(e);
        }
    }

    async deleteCPU(req, res, next){
        try{
            const {Name} = req.params;

            const delCPU = await CpuService.delete(Name);

            return res.json(delCPU);
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = new CPUController();