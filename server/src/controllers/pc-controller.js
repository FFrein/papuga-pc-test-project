const ApiError = require('../exceptions/api-error');
const {PCService, PC} = require('../service/pc-service');
const pcService = new PCService();

class PCController{
    async createPC(req, res, next){
        try{
            const {Author, Name,Motherboard,CPU,GPU,RAM_SIZE,RAM_Quantity,Published} = req.body;

            if(RAM_SIZE <= 0 || RAM_Quantity <= 0){
                return res.status(202).json(new ApiError("Неправильно заполненны поля"));
            }
            else{
                const newPC = await pcService.create(new PC(Author, Name, Motherboard, CPU, GPU, RAM_SIZE, RAM_Quantity, Published));

                return res.json(newPC);
            }
        }
        catch(e){
            next(e);
        }
    }

    async getPCs(req, res, next){
        try{
            const PCs = await pcService.read();
            return res.json(PCs);
        }
        catch(e){
            next(e);
        }
    }

    async getPublishedPCs(req, res, next){
        try{
            const PCs = await pcService.readPublishedPCs();
            return res.json(PCs);
        }
        catch(e){
            next(e);
        }
    }

    async getCurrentPC(req, res, next){
        const {id} = req.params;
        try{
            const PCs = await pcService.readCurrentPC(id);
            return res.json(PCs);
        }
        catch(e){
            next(e);
        }
    }
    
    async getUserPCs(req, res, next){
        try{
            const {author} = req.params;
            const PCs = await pcService.readUserPC(author);
            return res.json(PCs);
        }
        catch(e){
            next(e);
        }
    }

    async updatePC(req, res, next){
        try{
            const {pcId, Author, Name, Motherboard, CPU,GPU,RAM_SIZE,RAM_Quantity,Published} = req.body;
            
            const pcToUpdate = await pcService.readCurrentPC(pcId);
            if(pcToUpdate){
                if(pcToUpdate.Author ==  Author || req.user.role == "admin"){
            
                    if(RAM_SIZE <= 0 || RAM_Quantity <= 0){
                        return res.status(202).json(new ApiError("Неправильно заполненны поля"));
                    }
                    else{
                        const updatePC = await pcService.update(pcId, new PC(pcToUpdate.Author, Name,Motherboard,CPU,GPU,RAM_SIZE,RAM_Quantity,Published));
        
                        return res.json(updatePC);
                    }
                }
                else{
                    return res.status(403).json("Недостаточно прав");
                }
            }
            return res.json("Объект не найден");

        }
        catch(e){
            next(e);
        }
    }

    async deletePC(req, res, next){
        try{
            const {pcId} = req.params;

            const pcToUpdate = await pcService.readCurrentPC(pcId);
            if(pcToUpdate){
                if(pcToUpdate.Author ==  req.user.id || req.user.role == "admin"){

                    const delPC = await pcService.delete(pcId);

                    return res.json(delPC);
                }
                else{
                    return res.status(403).json("Недостаточно прав");

                }
            }
            return res.json("Объект не найден");
        }
        catch(e){
            next(e);
        }
    }
}

module.exports = new PCController();