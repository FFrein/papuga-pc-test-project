const {GPUService, GPU} = require('../service/gpu-service');
const GpuService = new GPUService();

class GPUController{
    async createGPU(req, res, next){
        try{
            const {Name, Brand, Interface, CoreClock, TurboBoost, MemoryType, MemorySize, BusWidth, Technology} = req.body;
            //Валидация полей?
            const newGPU = await GpuService.create(new GPU(Name, Brand, Interface, CoreClock, TurboBoost, MemoryType, MemorySize, BusWidth, Technology));

            return res.json(newGPU);
        }
        catch(e){
            next(e);
        }
    }

    async getGPUs(req, res, next){
        try{
            const GPUs = await GpuService.read();
            return res.json(GPUs);
        }
        catch(e){
            next(e);
        }
    }

    async updateGPU(req, res, next){
        try{
            const {NewName, Name, Brand, Interface, CoreClock, TurboBoost, MemoryType, MemorySize, BusWidth, Technology} = req.body;
            
            const updateGPU = await GpuService.update(Name, new GPU(NewName, Brand, Interface, CoreClock, TurboBoost, MemoryType, MemorySize, BusWidth, Technology));

            return res.json(updateGPU);
        }
        catch(e){
            next(e);
        }
    }

    async deleteGPU(req, res, next){
        try{
            const {Name} = req.params;

            const delGPU = await GpuService.delete(Name);

            return res.json(delGPU);
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = new GPUController();